import { useRef } from 'react';
import './global.css';
import { View, StatusBar } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export default function App() {
  const statusBarHeight = StatusBar.currentHeight || 0; // Android에서만 유효, iOS는 0 반환
  console.log('Status Bar Height:', statusBarHeight);

  const webViewRef = useRef<WebView>(null);

  // 웹뷰로 메시지 전송
  const sendMessageToWeb = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({ type: 'GREETING', data: 'Hello from RN!' }),
      );
    }
  };

  // 웹뷰에서 메시지 수신
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Received from Web:', data);
    // 예: { type: 'RESPONSE', data: 'Hello from Web!' }
  };
  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://localhost:3050/' }} // React 웹앱 URL
        onMessage={handleMessage}
        onLoadEnd={sendMessageToWeb}
        style={{ flex: 1 }}
      />
    </View>
  );
}
