package com.ccss_t_client;

import android.app.Application;
import android.content.Context;

import com.facebook.react.ReactApplication;
import codes.simen.IMEI.IMEI;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends Application implements ReactApplication {
  public static Context appContext;
  private static MainApplication instance;
  private static final com.ccss_t_client.CommPackage mCommPackage = new com.ccss_t_client.CommPackage();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new IMEI(),
            new OrientationPackage(),new VectorIconsPackage(),
              mCommPackage
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  /**
   *包名
   */
  public String getAppPackageName() {
    return this.getPackageName();
  }

  /**
   * 获取Application实例
   */
  public static MainApplication getInstance() {
    return instance;
  }

  /**
   * 获取 reactPackage
   * @return
   */
  public static CommPackage getReactPackage() {
    return mCommPackage;
  }


  @Override
  public void onCreate() {
    super.onCreate();
    instance = this;
    appContext = getApplicationContext();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
