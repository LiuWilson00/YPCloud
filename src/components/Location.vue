<template>
  <div class="location">
    <p style = "font-weight: bold;">Show your loaction here</p>
    <button class="but" @click="getLoca()"> Click me </button><p></p>
    <p v-show="show">Location : {{ location }}</p>
  </div>
</template>

<script type="text/javascript" src="http://code.google.com/apis/gears/gears_init.js"></script>
<script>
export default{
  data() {
    return{
      show: false,
      location: "unknown"
    }
  },
  methods: {
    getLoca: function() {
      // 瀏覽器支援 HTML5 定位方法
      if (navigator.geolocation) {
        //_location='error';
        //this.location=_location;
        // HTML5 定位抓取
        navigator.geolocation.getCurrentPosition(function (position) {
          mapServiceProvider(position.coords.latitude, position.coords.longitude);
        },
        function(error,_location) {
          switch (error.code) {
            case error.TIMEOUT:
              alert('連線逾時');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('無法取得定位');
              break;
            case error.PERMISSION_DENIED: // 拒絕
              alert('想要參加本活動，\n記得允許手機的GPS定位功能喔!');
              break;
            case error.UNKNOWN_ERROR:
              alert('不明的錯誤，請稍候再試');
              break;
          }
        });
      }
      else { // 不支援 HTML5 定位
        // 若支援 Google Gears
        if (window.google && google.gears) {
          try {
            // 嘗試以 Gears 取得定位
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true, gearsRequestAddress: true });
          } catch (e) {
            alert('定位失敗請稍候再試');
          }
        } else {
          alert('想要參加本活動，\n記得允許手機的GPS定位功能喔!');
        }
      }
      // 取得 Gears 定位發生錯誤
      function errorCallback(err) {
        var msg = 'Error retrieving your location: ' + err.message;
        alert(msg);
      }
      // 成功取得 Gears 定位
      function successCallback(p) {
        mapServiceProvider(p.latitude, p.longitude);
      }
      // 顯示經緯度
      function mapServiceProvider(latitude, longitude) {
        alert('經緯度：' + latitude + ', ' + longitude);
      }
    }
  }
}
</script>

<style scoped>
.but {
	-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background-color:transparent;
	-webkit-border-top-left-radius:20px;
	-moz-border-radius-topleft:20px;
	border-top-left-radius:20px;
	-webkit-border-top-right-radius:20px;
	-moz-border-radius-topright:20px;
	border-top-right-radius:20px;
	-webkit-border-bottom-right-radius:20px;
	-moz-border-radius-bottomright:20px;
	border-bottom-right-radius:20px;
	-webkit-border-bottom-left-radius:20px;
	-moz-border-radius-bottomleft:20px;
	border-bottom-left-radius:20px;
	text-indent:0;
	border:1px solid #dcdcdc;
	display:inline-block;
	color:#777777;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	font-style:normal;
	height:65px;
	line-height:65px;
	width:131px;
	text-decoration:none;
	text-align:center;
}
.but:active {
	position:relative;
	top:1px;
}
.but:hover {
	border:3px;
}
</style>
