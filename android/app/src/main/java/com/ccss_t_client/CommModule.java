package com.ccss_t_client;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.example.helloanychat.AnyChatMainActivity;
import com.example.helloanychat.VideoActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CommModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    public static final String MODULE_NAME = "commModule";
    public static final String EVENT_NAME = "nativeCallRn";
    public static final String EVENT_NAME1 = "getPatchImgs";
    /**
     * 构造方法必须实现
     * @param reactContext
     */
    public CommModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        Log.e("进入CommModule的构造方法..","");
    }

    /**
     * 在rn代码里面是需要这个名字来调用该类的方法
     * @return
     */
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void rnCallNative(String name){
        try{
            Log.e("---","rnCallNative:");
        }catch(Exception e){
            throw new JSApplicationIllegalArgumentException(
                    "错误: "+e.getMessage());
        }
    }
    /* js页面跳转到activity 并传数据(@ReactMethod  一定要加上)
    * @param name
    */
    @ReactMethod
    public void rnCallNative_(String userId,String ip,String port,String name,String roomId){
        try{
            Activity currentActivity = getCurrentActivity();
            Log.e("---","当前activity:"+currentActivity);
            if(null!=currentActivity){
                //Class aimActivity = Class.forName(name);
//                Intent intent = new Intent(currentActivity, AnychatActivity.class);
                Intent intent = new Intent(currentActivity, VideoActivity.class);
//                Intent intent = new Intent(currentActivity, AnyChatMainActivity.class);
                //Intent intent = new Intent(currentActivity,DetailActivity.class);

                Bundle bundle = new Bundle();
                bundle.putString("userId", userId);
                bundle.putString("ip", ip);
                bundle.putString("port", port);
                bundle.putString("name", name);
                bundle.putString("roomId", roomId);
                intent.putExtras(bundle);

                currentActivity.startActivity(intent);
            }
        }catch(Exception e){

            throw new JSApplicationIllegalArgumentException(
                    "无法打开activity页面: "+e.getMessage());
        }
    }

    /**
     * Native调用RN
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME,msg);
    }

    /**
     * Callback 方式
     * rn调用Native,并获取返回值
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {

        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        callback.invoke(result);
    }

    /**
     * Promise
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void rnCallNativeFromPromise(String msg, Promise promise) {

        Log.e("---","adasdasda");
        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        promise.resolve(result);
    }
}
