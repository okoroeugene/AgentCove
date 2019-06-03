package com.agentscove;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.widget.Toast;

import java.math.BigDecimal;
import com.google.gson.Gson;

import kin.sdk.*;
import kin.sdk.exception.CreateAccountException;
import kin.sdk.exception.DeleteAccountException;
import kin.utils.Request;
import kin.utils.ResultCallback;

public class KinNativeModule extends ReactContextBaseJavaModule {

    private KinClient kinClient;
    private KinAccount kinAccount;
    private String publicAddress;
    private Gson gson = new Gson();
    private final String APP_ID = "vNiX";
    private final String ENVIRONMENT = "PRODUCTION";

    public KinNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        init();
    }

    @Override
    public String getName() {
        return "KinNativeModule";
    }
    
    private Environment getEnvironment(String environment) {
        Environment environ;
        switch (environment) {
            case "production":
            case "PRODUCTION":
                environ = Environment.PRODUCTION;
                break;
            default:
                environ = Environment.TEST;
                break;
        }
        return environ;
    }

    @ReactMethod
    public void sayHi(Callback cb) {
        cb.invoke("Callback : Greetings from Java: I know, i know");
    }

    private void init () {
        getClient(APP_ID, ENVIRONMENT);
        getOrCreateAccount();
    }

    @ReactMethod
    public void getClient(String appId, String environment, Callback cb) {
        cb.invoke(null, gson.toJson(getClient(appId, environment)));
    }
    
    private KinClient getClient(String appId, String environment) {
        Environment env = getEnvironment(environment);
        kinClient = new KinClient(getReactApplicationContext(), env, appId);
        return kinClient;
    }

    @ReactMethod
    public void createAccount(Callback cb) {
        Toast.makeText(getReactApplicationContext(), "About to create the account", Toast.LENGTH_SHORT).show();
        try {
            if (!kinClient.hasAccount()) {
                kinAccount = kinClient.addAccount();
            } else {
                kinAccount = kinClient.getAccount(0);
            }
            cb.invoke(null, kinAccount.getStatusSync());
        } catch (Exception ex) {
            cb.invoke(gson.toJson(new Error(ex.getMessage(), ex.getCause())));
        }
    }

    @ReactMethod
    public void createUserAccount(Callback cb) {
        Toast.makeText(getReactApplicationContext(), "About to create account for user", Toast.LENGTH_SHORT).show();
        KinAccount account = null;
        try {
            account = kinClient.addAccount();
            cb.invoke(null, account.getPublicAddress(), kinClient.getAccountCount() - 1);
        } catch (CreateAccountException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }
    
    private KinAccount getOrCreateAccount() {
        if (kinAccount != null) return kinAccount;
        else if (kinClient.hasAccount()) {
            kinAccount = kinClient.getAccount(0);
            return kinAccount;
        }
        else {
            try {
                kinAccount = kinClient.addAccount();
            } catch (Exception ex) {
                System.out.println(ex);
            }
            return kinAccount;
        }
    }

    @ReactMethod
    public void getAccount(Callback cb) {
        if (kinAccount != null) cb.invoke(null, gson.toJson(kinAccount));
        else if (kinClient.hasAccount()) {
            kinAccount = kinClient.getAccount(0);
            cb.invoke(null, gson.toJson(kinAccount));
        }
        else cb.invoke(gson.toJson(new Error("Cannot find an associated kin account for the kin client")));
    }

    @ReactMethod
    public void deleteAccount(int index, Callback cb) {
        if (!kinClient.hasAccount()) cb.invoke(gson.toJson(new Error("Kin client does not have any account")));
        try {
            kinClient.deleteAccount(index);
        } catch (DeleteAccountException e) {
            cb.invoke(new Error(e.getMessage(), e.getCause()));
        }
        cb.invoke(null, index);
    }

    @ReactMethod
    public void deleteAccount(Callback cb) throws Exception {
        deleteAccount(0, cb);
    }

    @ReactMethod
    public void getPublicAddress(Callback cb) {
        if (publicAddress != null) cb.invoke(null, publicAddress);
        else {
            publicAddress = kinAccount.getPublicAddress();
            cb.invoke(null, publicAddress);
        }
    }

    @ReactMethod
    public void getStatus(final Callback cb) {
        Request<Integer> statusRequest = kinAccount.getStatus();
        statusRequest.run(new ResultCallback<Integer>() {
            @Override
            public void onResult(Integer result) {
                switch (result) {
                    case AccountStatus.CREATED:
                        cb.invoke(null, gson.toJson(new Status("Kin account has been created", 200)));
                        break;
                    case AccountStatus.NOT_CREATED:
                        cb.invoke(null, gson.toJson(new Status("Kin account was not created", 400)));
                        break;
                }
            }

            @Override
            public void onError(Exception e) {
                cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
            }
        });
    }

    @ReactMethod
    public void getBalance(final Callback cb) {
        Request<Balance> balanceRequest = kinAccount.getBalance();
        balanceRequest.run(new ResultCallback<Balance>() {

            @Override
            public void onResult(Balance result) {
                cb.invoke(null, gson.toJson(result));
            }

            @Override
            public void onError(Exception e) {
                cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
            }
        });
    }

    @ReactMethod
    public void buildTransaction(String recipientAddress, BigDecimal amount, final Callback cb) {
        try {
            buildTransaction(recipientAddress, amount, getCurrentMinimumFee(), cb);
        } catch (Exception e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void buildTransaction(String recipientAddress, BigDecimal amount, int fee, final Callback cb) {
        buildTransaction(recipientAddress, amount, fee, null, cb);
    }

    @ReactMethod
    public void buildTransaction(String recipientAddress, BigDecimal amount, int fee, String memo, final Callback cb) {
        Request<Transaction> transactionRequest = kinAccount.buildTransaction(recipientAddress, amount, fee, memo);
        transactionRequest.run(new ResultCallback<Transaction>() {
            @Override
            public void onResult(Transaction transaction) {
                Request<TransactionId> sendTransactionRequest = kinAccount.sendTransaction(transaction);
                sendTransactionRequest.run(new ResultCallback<TransactionId>() {
                    @Override
                    public void onResult(TransactionId transactionId) {
                        cb.invoke(null, gson.toJson(transactionId));
                    }

                    @Override
                    public void onError(Exception e) {
                        cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
            }
        });
    }

    @ReactMethod
    public void buildWhitelistedTransaction(String recipientAddress, BigDecimal amount, int fee, final Callback cb) {

    }

    @ReactMethod
    public void addPaymentListener(final Callback cb) {
        ListenerRegistration listenerRegistration = kinAccount.addPaymentListener(payment -> cb.invoke(gson.toJson(payment)));
    }

    @ReactMethod
    public void addBalanceListener(final Callback cb) {
        ListenerRegistration listenerRegistration = kinAccount.addBalanceListener(balance -> cb.invoke(gson.toJson(balance)));
    }

    @ReactMethod
    public void addAccountCreationListener(final Callback cb) {
        ListenerRegistration listenerRegistration = kinAccount.addAccountCreationListener(result -> cb.invoke(gson.toJson(result)));
    }

    @ReactMethod
    public void getCurrentMinimumFee(Callback cb){
        try{
            int fee = (int) Math.ceil(kinClient.getMinimumFeeSync());
            cb.invoke(null, fee);
        } catch(Exception ex) {
            cb.invoke(gson.toJson(new Error(ex.getMessage(), ex.getCause())));
        }
    }
    private int getCurrentMinimumFee() throws Exception{
        return (int) Math.ceil(kinClient.getMinimumFeeSync());
    }
}