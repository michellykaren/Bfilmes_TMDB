import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import PosterRow from '../../components/cards/rows/PosterRow';
import PersonListRow from '../../components/cards/rows/PersonListRow';
import PersonRow from '../../components/cards/rows/PersonRow';
import SectionRow from '../../components/cards/rows/SectionRow';
import MainInfoRow from '../../components/cards/rows/MainInfoRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/api';

import { getImageApi } from '../../utils/images';
import { convertMinsToHrsMins } from '../../utils/time';
import { convertToUpperCaseFirstLetter } from '../../utils/letters';
import { convertToDate } from '../../utils/dates';
import { convertToGenres } from '../../utils/genre';
import { sliceArrayLength } from '../../utils/array';

import isoLanguage from '../../data/iso.json';

import { darkBlue, white } from '../../utils/colors';
import styles from './styles';

const UNINFORMED = 'Não informado';
const INITIAL_INFO = {
  id: '',
  backdropPath: '',
  title: '',
  voteAverage: 0,
  video: [],
  overview: UNINFORMED,
  cast: [],
  crew: [],
  productionCompanies: [],
  images: [],
  infosDetail: {
    Duração: UNINFORMED,
    Gênero: UNINFORMED,
    Linguagem: UNINFORMED,
    Lançamento: UNINFORMED
  }
};
const ADULT_RATE = {
  true: 'No',
  false: 'Yes'
};

const renderReadMoreFooter = (text, handlePress) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>{text}</Text>
  </TouchableOpacity>
);

const MovieDetails = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [creditId, setCreditId] = useState(null);
  const [info, setInfo] = useState(INITIAL_INFO);

  useEffect(() => {
    navigation.setParams({ handleShare });
    requestMoviesInfo();
  }, []);

  requestMoviesInfo = async () => {
    try {
      setIsLoading(true);

      const { id } = navigation.state.params;
      const data = await request(`movie/${id}`, {
        include_image_language: 'pt-br,null',
        append_to_response: 'credits,videos,images'
      });

      setIsLoading(false);
      setIsError(false);
      setInfo({
        id,
        backdropPath: data.backdrop_path || INITIAL_INFO.backdropPath,
        title: data.title || INITIAL_INFO.title,
        voteAverage: data.vote_average || INITIAL_INFO.voteAverage,
        video: data.videos.results[0] || INITIAL_INFO.video,
        overview: data.overview || INITIAL_INFO.overview,
        cast: sliceArrayLength(data.credits.cast, 15),
        crew: sliceArrayLength(data.credits.crew, 15),
        productionCompanies: sliceArrayLength(data.production_companies, 10),
        images: formatImageUrl(data.images.backdrops),
        infosDetail: getInfosDetail(data)
      });
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  getInfosDetail = ({
    runtime = 0,
    genres = '',
    original_language = '',
    release_date = ''
  }) => ({
    Duração: convertMinsToHrsMins(runtime),
    Gênero: convertToGenres(sliceArrayLength(genres, 1)),
    Linguagem: convertToUpperCaseFirstLetter(isoLanguage[original_language]),
    Lançamento: convertToDate(release_date)
  });

  formatImageUrl = images =>
    sliceArrayLength(images, 15).map(item =>
      getImageApi(item.file_path, 'url', 'original')
    );



  handlePerson = id => {
    setCreditId(id);
    
  };

  handleImage = () => {
    setShowImage(!showImage);
  };

  handleShare = (title, id) => {
    if (isError) {
      Alert({
        title: 'Atenção',
        description: 'Tente novamente depois'
      });
    } else {
      Share({
        message: `${title}, saiba mais sobre esse filme \u{1F37F}`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: 'AmoCinema',
        dialogTitle: `${title}, saiba mais sobre esse filme \u{1F37F}`
      });
    }
  };

  renderItem = (item, type, handleTeamDetail) => (
    <PersonRow item={item} type={type} onTeamDetail={handleTeamDetail} />
  );

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Não informado</Text>
    </View>
  );

  {
    const {
      backdropPath,
      voteAverage,
      video,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
      images
    } = info;
    const { navigate } = navigation;

    return (
      <Screen>
        <View style={styles.container}>
          {isLoading ? (<Spinner />) : isError ? (
            <NotificationCard icon="alert-octagon" onPress={requestMoviesInfo}/>
          ) : (
            <ScrollView>
              <PosterRow
                title={title}
                backdropPath={backdropPath}
                voteAverage={voteAverage}
                images={images}
                video={video}
                navigate={navigate}
                showImage={showImage}
                onPress={handleImage}
              />
              <View style={styles.containerMovieInfo}>
                <MainInfoRow data={infosDetail} />
                <SectionRow title="Sinopse">
                  <ReadMore
                    numberOfLines={10}
                    renderTruncatedFooter={handlePress =>
                      renderReadMoreFooter('Leia mais', handlePress)
                    }
                    renderRevealedFooter={handlePress =>
                      renderReadMoreFooter('Menos', handlePress)
                    }
                  >
                    <Text style={styles.subTitleInfo}>{overview}</Text>
                  </ReadMore>
                </SectionRow>
                <SectionRow title="Elenco principal">
                  <PersonListRow
                    data={cast}
                    type="character"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title="Equipe técnica principal">
                  <PersonListRow
                    data={crew}
                    type="job"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title="Produção" isLast>
                  <PersonListRow
                    data={productionCompanies}
                    type="production"
                    keyItem="id"
                    ListEmptyComponent={renderListEmpty}
                    onTeamDetail={handlePerson}
                    renderItem={renderItem}
                  />
                </SectionRow>
              </View>
            </ScrollView>
          )}
          
        </View>
      </Screen>
    );
  }
};

MovieDetails.navigationOptions = ({ navigation }) => {
  const { id, title, handleShare } = navigation.state.params || {};

  return {
    title: 'Detalhes do filme',
    headerRight: (
      <TouchableOpacity
        style={styles.buttonShare}
        onPress={() => handleShare(title, id)}>
        <Feather name="share" size={23} color={white} />
      </TouchableOpacity>
    )
  };
};

export default MovieDetails;
