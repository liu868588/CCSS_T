package com.ccss_t_client;

import com.bairuitech.anychat.AnyChatBaseEvent;
import com.bairuitech.anychat.AnyChatCoreSDK;
import com.bairuitech.anychat.AnyChatDefine;
import com.example.config.ConfigEntity;
import com.example.config.ConfigService;
import com.facebook.react.ReactActivity;

 import android.content.Intent; // <--- import
    import android.content.res.Configuration; // <--- import
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;

public class MainActivity extends ReactActivity{
    private long exitTime = 0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CCSS_T_client";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
            super.onConfigurationChanged(newConfig);
            Intent intent = new Intent("onConfigurationChanged");
            intent.putExtra("newConfig", newConfig);
            this.sendBroadcast(intent);
    }

    /**
     * 向RN发送消息
     * @param v
     */
    public void sendMsgToRN(View v) {
        MainApplication.getReactPackage().mModule.nativeCallRn("hello");
    }

    int count = -1;
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_VOLUME_DOWN:
                Log.e("调用前","  ");
                sendMsgToRN(null);
                Log.e("调用后","  ");
                //Toast.makeText(this, "-----------------"+count, Toast.LENGTH_SHORT).show();
                //count--;
                return true;
            case KeyEvent.KEYCODE_VOLUME_UP:
                Toast.makeText(this, "++++++++++++++++"+ count, Toast.LENGTH_SHORT).show();
                count++;
                return true;
            case KeyEvent.KEYCODE_VOLUME_MUTE:
                Toast.makeText(this, "MUTE", Toast.LENGTH_SHORT).show();
                return true;
            case KeyEvent.KEYCODE_BACK:
                if ((System.currentTimeMillis() - exitTime) > 2000) {
                    Toast.makeText(MainActivity.this,"再按一次退出程序",Toast.LENGTH_SHORT).show();
                    exitTime = System.currentTimeMillis();
                } else {
                    Log.e("MainActivity","退出");
                    finish();
                    System.exit(0);
                }
                return true;
        }
        return super.onKeyDown(keyCode, event);
    }

}
