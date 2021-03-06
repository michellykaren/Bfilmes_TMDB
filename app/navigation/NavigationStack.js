import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { MoviesScreen, SearchScreen, ConfigurationScreen } from './screens'; //as 3 telas criadas
import { ROUTES, TABS } from './routes'; //rotas e nomes das telas

import { bfilmes, white, pink, blue } from '../utils/colors'; 

const defaultNavigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: bfilmes
  }
};

const MoviesStack = createStackNavigator(MoviesScreen, { //Fornece uma maneira de seu aplicativo fazer a transição entre telas, onde cada nova tela é colocada no topo de uma pilha
  initialRouteName: ROUTES.MOVIE_LIST, //Define a tela padrão da pilha
  defaultNavigationOptions, //cabeçalho personalizado para todas as telas do navegador
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="home" size={24} color={bfilmes} />
    )
  }
});

const SearchStack = createStackNavigator(SearchScreen, {
  initialRouteName: ROUTES.SEARCH,
  defaultNavigationOptions,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="search" size={24} color={bfilmes} />
    )
  }
});

const ConfigurationStack = createStackNavigator(ConfigurationScreen, {
  initialRouteName: ROUTES.CONFIGURATION,
  defaultNavigationOptions,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="menu" size={24} color={bfilmes} />
    )
  }
});

const MovieListTabBarVisible = navigation => {
  const { routes } = navigation.state;

  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === ROUTES.MOVIE_DETAILS ||
      route.routeName === ROUTES.MOVIE_VIDEO ||
      route.routeName === ROUTES.SEARCH_RESULTS 
    ) {
      return false;
    }
  }

  return true;
};
// Main Navigator
const tabNavigatorDefault = {
  [TABS.HOME]: {
    screen: MoviesStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  [TABS.SEARCH]: {
    screen: SearchStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: MovieListTabBarVisible(navigation)
    })
  },
  [TABS.CONFIG]: {
    screen: ConfigurationStack
  }
};

//menu do navegador
const MainNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(tabNavigatorDefault, {
        tabBarOptions: {
          activeTintColor: pink,
          inactiveTintColor: blue,
          showIcon: true,
          labelStyle: {
            margin: 0,
            padding: 2
          },
          style: {
            backgroundColor: white
          }
        },
        animationEnabled: false,
        swipeEnabled: false
      })
    : createMaterialBottomTabNavigator(tabNavigatorDefault, {
        initialRouteName: TABS.HOME, //Uma barra de guias que permite alternar entre diferentes rotas
        activeColor: '#000000',
        inactiveColor: blue,
        shifting: true,
        barStyle: {
          backgroundColor: white,
          paddingTop: 2,
          paddingBottom: 2
        }
      });

const AppNavigator = createSwitchNavigator( //to only ever show one screen at a time
  {
    Main: MainNavigator
  },
  {
    initialRouteName: 'Main' //The routeName for the initial tab route when first loading
  }
);

export default createAppContainer(AppNavigator);
