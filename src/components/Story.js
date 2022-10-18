/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Card, Button, Text} from 'react-native-paper';
import {axiosInstance} from '../api';
import moment from 'moment';
import {Linking, Alert, View} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const DEFAULT_DATA = {
  by: 'jamesfisher',
  descendants: 27,
  id: 33236447,
  kids: [
    33237695, 33236980, 33237074, 33238127, 33237802, 33236847, 33237028,
    33237285, 33237022, 33237209, 33237577, 33237061,
  ],
  score: 147,
  time: 1666026049,
};

const Story = story => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchStoryDetails = async () => {
    setLoading(true);
    try {
      const itemResponse = await axiosInstance.get(`/item/${story.story}.json`);
      setData(itemResponse.data);
      setLoading(false);
    } catch (e) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStoryDetails();
  }, []);

  const openLink = async () => {
    try {
      const url = data?.url;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#ff6600',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#ff6600',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        await this.sleep(800);
        Alert.alert(JSON.stringify(result));
      } else {
        return Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Card style={{marginBottom: 10}}>
      {loading ? (
        <View>
          <Text>Loading.....</Text>
        </View>
      ) : error ? (
        <Card.Content>
          <Text>An Error Occured</Text>
        </Card.Content>
      ) : (
        <>
          <Card.Content>
            <Text>{data?.title}</Text>
            <Text>by: {data?.by}</Text>
            <Text>score: {data?.score}</Text>
            <Text>type: {data?.type}</Text>
            <Text>
              {moment(new Date().getTime() - data?.time)
                .startOf('hour')
                .fromNow()}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => openLink()}>View Article</Button>
          </Card.Actions>
        </>
      )}
    </Card>
  );
};

export default Story;
