import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Truck, 
  Activity, 
  AlertTriangle, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Clock, 
  User, 
  Phone,
  MapPin,
  Battery,
  Eye,
  Thermometer,
  Droplet,
  Moon,
  Coffee,
  UserCheck,
  FileText,
  TrendingUp,
  Bell,
  Gauge,
  Fuel,
  Wind,
  Zap,
  Settings,
  Navigation,
  Wifi
} from 'lucide-react';

const HealthManagementApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [driverData, setDriverData] = useState({
    name: '田中 太郎',
    id: 'DR-001',
    heartRate: 72,
    bloodPressure: '120/80',
    fatigue: 'normal',
    temperature: 36.5,
    lastBreak: '30分前',
    drivingTime: '2時間15分',
    alertLevel: 'normal'
  });

  const [vehicleData, setVehicleData] = useState({
    truckId: 'TRK-A001',
    model: 'いすゞ ギガ',
    speed: 65,
    engineRpm: 1800,
    fuelLevel: 75,
    engineTemp: 85,
    brakeTemp: 45,
    steeringPattern: 'stable',
    vibration: 'normal',
    seatPressure: 82,
    cabinTemp: 24,
    co2Level: 420,
    location: '東名高速道路 海老名SA付近',
    nextSA: '足柄SA (28km)',
    airPressure: 'normal',
    tirePressure: [8.2, 8.1, 8.3, 8.2, 8.0, 7.9],
    averageSpeed: 58,
    harshBraking: 0,
    rapidAcceleration: 1
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // シミュレートされたリアルタイムデータ更新
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverData(prev => ({
        ...prev,
        heartRate: Math.floor(Math.random() * 20) + 65,
        fatigue: Math.random() > 0.8 ? 'warning' : 'normal',
        drivingTime: `${Math.floor(Math.random() * 4) + 1}時間${Math.floor(Math.random() * 60)}分`
      }));
      
      setVehicleData(prev => ({
        ...prev,
        speed: Math.floor(Math.random() * 20) + 55,
        engineRpm: Math.floor(Math.random() * 400) + 1600,
        steeringPattern: Math.random() > 0.9 ? 'irregular' : 'stable',
        vibration: Math.random() > 0.95 ? 'high' : 'normal',
        seatPressure: Math.floor(Math.random() * 10) + 78,
        harshBraking: Math.random() > 0.8 ? prev.harshBraking + 1 : prev.harshBraking
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const AlertCard = ({ type, message, time }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      type === 'emergency' ? 'bg-red-50 border-red-500' :
      type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
      'bg-blue-50 border-blue-500'
    }`}>
      <div className="flex items-center gap-2">
        <AlertTriangle className={`w-5 h-5 ${
          type === 'emergency' ? 'text-red-500' :
          type === 'warning' ? 'text-yellow-500' :
          'text-blue-500'
        }`} />
        <span className="font-medium">{message}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{time}</div>
    </div>
  );

  const VitalCard = ({ icon: Icon, label, value, status, unit = '' }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${
            status === 'warning' ? 'text-yellow-500' :
            status === 'danger' ? 'text-red-500' :
            'text-blue-500'
          }`} />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${
          status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          status === 'danger' ? 'bg-red-100 text-red-800' :
          'bg-green-100 text-green-800'
        }`}>
          {status === 'normal' ? '正常' : status === 'warning' ? '注意' : '危険'}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-500 ml-1">{unit}</span>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      {/* ドライバー情報ヘッダー */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{driverData.name}</h2>
            <p className="text-blue-100">ID: {driverData.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">現在時刻</p>
            <p className="text-lg font-mono">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* 車両データ連携アラート */}
      {vehicleData.steeringPattern === 'irregular' && (
        <AlertCard 
          type="warning" 
          message="車両データから運転パターンの変化を検知しました。疲労の可能性があります。" 
          time="1分前" 
        />
      )}
      
      {driverData.fatigue === 'warning' && (
        <AlertCard 
          type="warning" 
          message="疲労レベルが上昇しています。30分以内に休憩を取ることをお勧めします。" 
          time="2分前" 
        />
      )}

      {/* バイタルサイン */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard 
          icon={Heart} 
          label="心拍数" 
          value={driverData.heartRate} 
          status={driverData.heartRate > 90 ? 'warning' : 'normal'}
          unit="bpm"
        />
        <VitalCard 
          icon={Activity} 
          label="血圧" 
          value={driverData.bloodPressure} 
          status="normal"
          unit="mmHg"
        />
        <VitalCard 
          icon={Thermometer} 
          label="体温" 
          value={driverData.temperature} 
          status="normal"
          unit="°C"
        />
        <VitalCard 
          icon={Eye} 
          label="疲労度" 
          value={driverData.fatigue === 'normal' ? '正常' : '注意'} 
          status={driverData.fatigue}
        />
      </div>

      {/* 車両情報 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-green-600" />
          車両データ連携
          <Wifi className="w-4 h-4 text-green-500" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Gauge className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">現在速度</p>
            <p className="text-lg font-bold">{vehicleData.speed} km/h</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Zap className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">エンジン回転数</p>
            <p className="text-lg font-bold">{vehicleData.engineRpm} rpm</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Fuel className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">燃料残量</p>
            <p className="text-lg font-bold">{vehicleData.fuelLevel}%</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Wind className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">シート圧力</p>
            <p className="text-lg font-bold">{vehicleData.seatPressure}%</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">運転行動分析</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ハンドル操作パターン</span>
                <span className={`font-medium ${vehicleData.steeringPattern === 'stable' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {vehicleData.steeringPattern === 'stable' ? '安定' : '不安定'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>車両振動レベル</span>
                <span className={`font-medium ${vehicleData.vibration === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                  {vehicleData.vibration === 'normal' ? '正常' : '高'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>急ブレーキ回数（今日）</span>
                <span className="font-medium">{vehicleData.harshBraking}回</span>
              </div>
              <div className="flex justify-between">
                <span>急加速回数（今日）</span>
                <span className="font-medium">{vehicleData.rapidAcceleration}回</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">車内環境</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>キャビン温度</span>
                <span className="font-medium">{vehicleData.cabinTemp}°C</span>
              </div>
              <div className="flex justify-between">
                <span>CO2濃度</span>
                <span className={`font-medium ${vehicleData.co2Level > 500 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {vehicleData.co2Level} ppm
                </span>
              </div>
              <div className="flex justify-between">
                <span>エアプレッシャー</span>
                <span className="font-medium text-green-600">正常</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 位置情報・ルート情報 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          位置・ルート情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">現在位置</p>
            <p className="font-medium">{vehicleData.location}</p>
            <p className="text-sm text-gray-600 mt-2 mb-1">次のサービスエリア</p>
            <p className="font-medium text-blue-600">{vehicleData.nextSA}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">平均速度（過去1時間）</p>
            <p className="font-medium">{vehicleData.averageSpeed} km/h</p>
            <p className="text-sm text-gray-600 mt-2 mb-1">車両ID</p>
            <p className="font-medium">{vehicleData.truckId} ({vehicleData.model})</p>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <Phone className="w-6 h-6" />
          <span className="text-sm font-medium">緊急通報</span>
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <Coffee className="w-6 h-6" />
          <span className="text-sm font-medium">休憩開始</span>
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <UserCheck className="w-6 h-6" />
          <span className="text-sm font-medium">産業医相談</span>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <MapPin className="w-6 h-6" />
          <span className="text-sm font-medium">医療機関検索</span>
        </button>
      </div>
    </div>
  );

  const HealthMonitoring = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">健康モニタリング</h2>
      
      {/* リアルタイム監視 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          リアルタイム監視
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">バイタルサイン推移</h4>
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">心拍数グラフ（過去1時間）</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">疲労度分析</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">まばたき頻度</span>
                <span className="text-sm font-medium text-green-600">正常</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">視線の動き</span>
                <span className="text-sm font-medium text-green-600">正常</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ハンドル操作</span>
                <span className="text-sm font-medium text-yellow-600">軽微な変化</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 車両データ統合分析 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          車両データ統合分析
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">運転行動パターン分析</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ハンドル操作安定性</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    vehicleData.steeringPattern === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicleData.steeringPattern === 'stable' ? '安定' : '要注意'}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {vehicleData.steeringPattern === 'stable' 
                    ? 'ハンドル操作が安定しており、集中力が保たれています。'
                    : 'ハンドル操作に微小な変化が見られます。疲労の初期兆候の可能性があります。'
                  }
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">シート圧力パターン</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    分析中
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  シート圧力の変化から姿勢の変化を監視し、疲労や不快感の兆候を検出しています。
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">健康×車両データ相関</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">心拍数 vs 運転負荷</p>
                  <p className="text-xs text-gray-600">相関係数: 0.73</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    正常範囲
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">疲労度 vs 操作精度</p>
                  <p className="text-xs text-gray-600">予測精度: 89%</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    AI分析中
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 車両メンテナンス情報 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">車両状態・メンテナンス</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">エンジン温度</p>
            <p className="text-lg font-bold text-green-600">{vehicleData.engineTemp}°C</p>
            <p className="text-xs text-green-600">正常</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">ブレーキ温度</p>
            <p className="text-lg font-bold text-green-600">{vehicleData.brakeTemp}°C</p>
            <p className="text-xs text-green-600">正常</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">タイヤ空気圧</p>
            <p className="text-lg font-bold text-blue-600">8.1</p>
            <p className="text-xs text-blue-600">平均値 (kg/cm²)</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">次回点検</p>
            <p className="text-lg font-bold text-yellow-600">15</p>
            <p className="text-xs text-yellow-600">日後</p>
          </div>
        </div>
      </div>

      {/* 健康アドバイス */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">今日の健康アドバイス</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">💧 水分補給のタイミング</p>
            <p className="text-sm text-blue-700 mt-1">次の休憩で250ml程度の水分補給をお勧めします。</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">🧘 簡単ストレッチ</p>
            <p className="text-sm text-green-700 mt-1">肩こり解消のため、運転席でできる首回しストレッチを試してみてください。</p>
          </div>
        </div>
      </div>
    </div>
  );

  const IndustrialDoctor = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">産業医連携</h2>
      
      {/* 産業医情報 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">山田 花子 医師</h3>
            <p className="text-gray-600">産業医・内科専門医</p>
            <p className="text-sm text-gray-500">○○運送株式会社 専属産業医</p>
          </div>
        </div>
      </div>

      {/* 面談予約 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          面談予約
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">次回定期面談</p>
                <p className="text-sm text-gray-600">2025年6月15日 14:00-14:30</p>
                <p className="text-sm text-gray-600">オンライン面談</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                参加
              </button>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors">
            緊急相談を予約する
          </button>
        </div>
      </div>

      {/* 健康相談履歴 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">相談履歴</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">血圧に関する相談</p>
                <p className="text-xs text-gray-500">2025年5月28日</p>
              </div>
              <button className="text-blue-600 text-sm hover:underline">詳細</button>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">睡眠の質について</p>
                <p className="text-xs text-gray-500">2025年5月15日</p>
              </div>
              <button className="text-blue-600 text-sm hover:underline">詳細</button>
            </div>
          </div>
        </div>
      </div>

      {/* 健康指導・改善プラン */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">個別改善プラン</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">生活習慣改善目標</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 1日2L以上の水分摂取</li>
              <li>• 2時間毎の休憩時間確保</li>
              <li>• 週3回以上の軽い運動</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">改善状況</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>水分摂取目標達成率</span>
                <span className="font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Emergency = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Shield className="w-6 h-6 text-red-600" />
        緊急時対応
      </h2>
      
      {/* 緊急通報 */}
      <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">緊急通報</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Phone className="w-6 h-6" />
            <span className="font-medium">119番通報</span>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-medium">会社に緊急連絡</span>
          </button>
        </div>
        <p className="text-sm text-red-700 mt-4">
          緊急時は迷わずボタンを押してください。GPS位置情報と健康データが自動で送信されます。
        </p>
      </div>

      {/* 現在位置と最寄り医療機関 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          最寄り医療機関
        </h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">川崎市立川崎病院</p>
                <p className="text-sm text-gray-600">救急対応 24時間 / 距離: 2.3km</p>
                <p className="text-sm text-gray-600">神奈川県川崎市川崎区新川通12-1</p>
              </div>
              <div className="text-right">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors mb-1 block">
                  ナビ
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors block">
                  電話
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">日本医科大学武蔵小杉病院</p>
                <p className="text-sm text-gray-600">救急対応 24時間 / 距離: 3.7km</p>
                <p className="text-sm text-gray-600">神奈川県川崎市中原区小杉町1-396</p>
              </div>
              <div className="text-right">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors mb-1 block">
                  ナビ
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors block">
                  電話
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 応急処置ガイド */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">応急処置ガイド</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">胸痛の場合</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>1. 安全な場所に停車</li>
              <li>2. 楽な姿勢で安静</li>
              <li>3. すぐに119番通報</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">めまい・意識障害</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>1. 即座に安全に停車</li>
              <li>2. ハザードランプ点灯</li>
              <li>3. 緊急通報ボタン押下</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 緊急連絡先 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">緊急連絡先</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">会社運行管理者</p>
              <p className="text-sm text-gray-600">田中管理者</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              連絡
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">産業医</p>
              <p className="text-sm text-gray-600">山田医師</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
              連絡
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TruckHealth Pro</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">デバイス接続中</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="space-y-2">
                {[
                  { id: 'dashboard', label: 'ダッシュボード', icon: Activity },
                  { id: 'monitoring', label: '健康モニタリング', icon: Heart },
                  { id: 'doctor', label: '産業医連携', icon: UserCheck },
                  { id: 'emergency', label: '緊急時対応', icon: Shield },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* メインコンテンツ */}
          <main className="flex-1">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'monitoring' && <HealthMonitoring />}
            {activeTab === 'doctor' && <IndustrialDoctor />}
            {activeTab === 'emergency' && <Emergency />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HealthManagementApp;