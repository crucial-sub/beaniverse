package com.beaniverse  // 패키지 이름이 다를 수 있으니 확인해주세요

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "beaniverse"  // 프로젝트 이름으로 변경해주세요

  override fun onCreate(savedInstanceState: Bundle?) {
    setTheme(R.style.AppTheme)  // AppTheme로 변경
    super.onCreate(null)
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
          DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}