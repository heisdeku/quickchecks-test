/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {View, StyleSheet, FlatList} from 'react-native';
import {axiosInstance} from '../../api';
import Story from '../../components/Story';

const ListScreen = () => {
  const [allData, setAllData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  let INDEX = 0;
  let END = 50;

  const fetchTopNews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/topstories.json');
      await setAllData(response.data);
      await setData(response.data.slice(INDEX, END));
      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log(e?.response);
      setLoading(false);
    }
  };
  console.log(data.length);
  React.useEffect(() => {
    fetchTopNews();
  }, []);

  const fetchMore = React.useCallback(() => {
    setData([...data, allData.splice(INDEX + 50, END + 50)]);
  }, []);

  const onRefresh = () => {
    fetchTopNews();
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator
            color="#ff6600"
            style={styles.loaderCircle}
            size={'large'}
          />
          <Text styles={styles.loaderText}>Fetching News</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={styles.heading}>
                <Text style={styles.headingText}>HackerNews Feed</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.body}
          onRefresh={() => onRefresh()}
          onScroll={true}
          refreshing={loading}
          onEndReached={() => fetchMore()}
          data={data}
          renderItem={({item}) => <Story story={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
  },
  heading: {
    backgroundColor: '#ff6600',
    paddingVertical: 12,
    width: '100%',
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24,
    textAlign: 'center',
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  loaderCircle: {marginBottom: 10},
  loaderText: {
    paddingTop: 20,
    fontSize: 18,
  },
  body: {
    paddingHorizontal: 16,
  },
});

export default ListScreen;
