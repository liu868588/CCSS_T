package com.ccss_t_client;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;

/**
 * Created by liuzy on 2017/7/7.
 */

public class DetailActivity extends AppCompatActivity {
    private TextView usernameMain;

    protected void onCreate(Bundle savedInstanceState) {
        Log.e("进入方法","onCreate");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        usernameMain = (TextView) findViewById(R.id.homeUser);

        Bundle bundle = this.getIntent().getExtras();

        //获取Bundle中的数据，注意类型和key
        String username = bundle.getString("username");
        Log.e("username为：",username);
        usernameMain.setText(username);
    }
}
