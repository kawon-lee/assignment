/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

const trips = [
  {
    id: 1,
    title: '여행 중',
    place: '오사카',
    date: '2026.02.15-2026.02.21',
    status: 'ongoing',
    color: '#C6FF8D',
  },
  {
    id: 2,
    title: '예정',
    place: '제주',
    date: '2026.03.01-2026.03.04',
    status: 'upcoming',
    color: '#FFD78D',
  },
  {
    id: 3,
    title: '종료',
    place: '구텐탁',
    status: 'past',
    color: '#CFCFCF',
  },
];

const schedule = [
  { time: '09:00', title: '공항도착' },
  { time: '11:00', title: '도톤보리구경' },
  { time: '13:00', title: '쇼핑하러가기' },
  { time: '15:00', title: '오사카성' },
  { time: '18:00', title: '숙소도착' },
];

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const [filter, setFilter] = useState('전체');
  const [expanded, setExpanded] = useState<number | null>(null);

  const content = [];

  if (filter === '전체') {
    for (let i = 0; i < trips.length; i++) {
      content.push(
        <View style={styles.card} key={i}>
          <ImageBackground
            source={require('./assets/images/bkimg.png')}
            style={{
              height: 233,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                alignSelf: 'flex-start',
                width: 64,
                height: 23,
                backgroundColor: trips[i].color,
                borderRadius: 20,
                margin: 10,
                alignItems: 'center',
              }}
            >
              <Text>{trips[i].title}</Text>
            </View>
            <View style={{ paddingBottom: 85 }}>
              <Text style={{ color: '#ffffff', fontSize: 20 }}>
                {trips[i].place}
              </Text>
              <Text style={{ color: '#ffffff', fontSize: 12 }}>
                {trips[i].date}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.cardbar}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                padding: 10,
                justifyContent: 'flex-end',
              }}
            >
              <Text>~개 일정</Text>
              <Text>~일간</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setExpanded(expanded === trips[i].id ? null : trips[i].id)
              }
            >
              <Text style={{ color: '#DF6C20', fontSize: 11, padding: 10 }}>
                {expanded === trips[i].id ? '일정 접기 ∧' : '일정 보기 ∨'}
              </Text>
            </TouchableOpacity>
          </View>
          {expanded === trips[i].id && (
            <View style={{ backgroundColor: '#ffffff' }}>
              <Text style={{ color: '#626262' }}>n일차 (월/일)</Text>
              {schedule.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'flex-start',
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#FFE5D8',
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: '#DF6C20' }}>{item.time}</Text>
                  </View>
                  <View>
                    <Text>{item.title}</Text>
                    <Text style={{ fontSize: 10, color: '#A8A8A8' }}>
                      일정 장소
                    </Text>
                    <Text style={{ fontSize: 10, color: '#A8A8A8' }}>메모</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>,
      );
    }
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>내 여행</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('눌림');
          }}
        >
          <Text style={{ color: '#ffffff' }}>+ 추가</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtering}>
        <TouchableOpacity
          style={styles.filteringbutton}
          onPress={() => {
            setFilter('전체');
          }}
        >
          <Text style={{ color: '#ffffff' }}>전체</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filteringbutton}
          onPress={() => {
            setFilter('예정된 여행');
          }}
        >
          <Text style={{ color: '#ffffff' }}>예정된 여행</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filteringbutton}
          onPress={() => {
            setFilter('지난 여행');
          }}
        >
          <Text style={{ color: '#ffffff' }}>지난 여행</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: 30,
          alignItems: 'center',
        }}
      >
        {content}
      </ScrollView>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          elevation: 100,
          height: '7%',
          borderTopColor: '#000000',
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M14 14L11.1067 11.1067"
              stroke="#8C7B73"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
              stroke="#8C7B73"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Text>검색</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Svg width="19" height="18" viewBox="0 0 19 18" fill="#8C7B73">
            <Path d="M12.2748 18L6.1374 15.9L1.38092 17.7C1.03995 17.8333 0.724555 17.7958 0.434733 17.5875C0.144911 17.3792 0 17.1 0 16.75V2.75C0 2.53333 0.0639313 2.34167 0.191794 2.175C0.319656 2.00833 0.494402 1.88333 0.716031 1.8L6.1374 0L12.2748 2.1L17.0313 0.3C17.3723 0.166667 17.6877 0.204167 17.9775 0.4125C18.2673 0.620833 18.4122 0.9 18.4122 1.25V15.25C18.4122 15.4667 18.3483 15.6583 18.2204 15.825C18.0926 15.9917 17.9178 16.1167 17.6962 16.2L12.2748 18ZM11.2519 15.55V3.85L7.16031 2.45V14.15L11.2519 15.55ZM13.2977 15.55L16.3664 14.55V2.7L13.2977 3.85V15.55ZM2.0458 15.3L5.1145 14.15V2.45L2.0458 3.45V15.3Z" />
          </Svg>
          <Text>내여행</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Svg width="21" height="20" viewBox="0 0 21 20" fill="#8C7B73">
            <Path d="M5.62595 14.5L12.7863 12.5L14.8321 5.5L7.67176 7.5L5.62595 14.5ZM10.229 11.5C9.8028 11.5 9.44052 11.3542 9.14218 11.0625C8.84383 10.7708 8.69466 10.4167 8.69466 10C8.69466 9.58333 8.84383 9.22917 9.14218 8.9375C9.44052 8.64583 9.8028 8.5 10.229 8.5C10.6552 8.5 11.0175 8.64583 11.3158 8.9375C11.6142 9.22917 11.7634 9.58333 11.7634 10C11.7634 10.4167 11.6142 10.7708 11.3158 11.0625C11.0175 11.3542 10.6552 11.5 10.229 11.5ZM10.229 20C8.814 20 7.48422 19.7375 6.2397 19.2125C4.99517 18.6875 3.9126 17.975 2.99198 17.075C2.07137 16.175 1.34256 15.1167 0.805534 13.9C0.268511 12.6833 0 11.3833 0 10C0 8.61667 0.268511 7.31667 0.805534 6.1C1.34256 4.88333 2.07137 3.825 2.99198 2.925C3.9126 2.025 4.99517 1.3125 6.2397 0.7875C7.48422 0.2625 8.814 0 10.229 0C11.644 0 12.9738 0.2625 14.2183 0.7875C15.4629 1.3125 16.5454 2.025 17.466 2.925C18.3866 3.825 19.1155 4.88333 19.6525 6.1C20.1895 7.31667 20.458 8.61667 20.458 10C20.458 11.3833 20.1895 12.6833 19.6525 13.9C19.1155 15.1167 18.3866 16.175 17.466 17.075C16.5454 17.975 15.4629 18.6875 14.2183 19.2125C12.9738 19.7375 11.644 20 10.229 20ZM10.229 18C12.4964 18 14.4272 17.2208 16.0212 15.6625C17.6152 14.1042 18.4122 12.2167 18.4122 10C18.4122 7.78333 17.6152 5.89583 16.0212 4.3375C14.4272 2.77917 12.4964 2 10.229 2C7.96158 2 6.03085 2.77917 4.43683 4.3375C2.84281 5.89583 2.0458 7.78333 2.0458 10C2.0458 12.2167 2.84281 14.1042 4.43683 15.6625C6.03085 17.2208 7.96158 18 10.229 18Z" />
          </Svg>
          <Text>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="#8C7B73">
            <Path
              d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Text>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Svg width="17" height="16" viewBox="0 0 17 16" fill="#8C7B73">
            <Path d="M5.29351 6.825C4.49224 6.04167 4.0916 5.1 4.0916 4C4.0916 2.9 4.49224 1.95833 5.29351 1.175C6.09478 0.391667 7.05802 0 8.18321 0C9.3084 0 10.2716 0.391667 11.0729 1.175C11.8742 1.95833 12.2748 2.9 12.2748 4C12.2748 5.1 11.8742 6.04167 11.0729 6.825C10.2716 7.60833 9.3084 8 8.18321 8C7.05802 8 6.09478 7.60833 5.29351 6.825ZM0 16V13.2C0 12.6333 0.149173 12.1125 0.447519 11.6375C0.745865 11.1625 1.14224 10.8 1.63664 10.55C2.69364 10.0333 3.76768 9.64583 4.85878 9.3875C5.94987 9.12917 7.05802 9 8.18321 9C9.3084 9 10.4165 9.12917 11.5076 9.3875C12.5987 9.64583 13.6728 10.0333 14.7298 10.55C15.2242 10.8 15.6205 11.1625 15.9189 11.6375C16.2172 12.1125 16.3664 12.6333 16.3664 13.2V16H0ZM2.0458 14H14.3206V13.2C14.3206 13.0167 14.2737 12.85 14.18 12.7C14.0862 12.55 13.9626 12.4333 13.8092 12.35C12.8886 11.9 11.9594 11.5625 11.0218 11.3375C10.0841 11.1125 9.13791 11 8.18321 11C7.2285 11 6.28232 11.1125 5.34466 11.3375C4.407 11.5625 3.47786 11.9 2.55725 12.35C2.40382 12.4333 2.28022 12.55 2.18645 12.7C2.09268 12.85 2.0458 13.0167 2.0458 13.2V14ZM9.62805 5.4125C10.0287 5.02083 10.229 4.55 10.229 4C10.229 3.45 10.0287 2.97917 9.62805 2.5875C9.22742 2.19583 8.7458 2 8.18321 2C7.62061 2 7.139 2.19583 6.73836 2.5875C6.33772 2.97917 6.1374 3.45 6.1374 4C6.1374 4.55 6.33772 5.02083 6.73836 5.4125C7.139 5.80417 7.62061 6 8.18321 6C8.7458 6 9.22742 5.80417 9.62805 5.4125Z" />
          </Svg>
          <Text>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#DF6C20',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  filtering: {
    flexDirection: 'row',
    gap: 10,
    padding: 20,
  },
  filteringbutton: {
    backgroundColor: '#DF6C20',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  card: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardbar: {
    backgroundColor: '#ffffff',
    marginTop: -80,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default App;
