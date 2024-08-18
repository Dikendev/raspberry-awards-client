import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Raspberry Awards",
          description: "Discover everything about the Raspberry Awards, the ceremony that celebrates the worst movies of the year. We are dedicated to providing the best experience for you.",
          learnMore: "Learn More",
          addMovie: "Add Movie",
          title: "Title",
          year: "Year",
          producers: "Producers",
          studios: "Studios",
          winner: "Winner",
          actions: "Actions",
          update: "Update",
          delete: "Delete",
          itemsPerPage: "Items per page",
          previous: "Previous",
          next: "Next",
          error: "Error",
          failedToFetchMovies: "Failed to fetch movies.",
          failedToDeleteMovie: "Failed to delete movie.",
          failedToUpdateMovie: "Failed to update movie.",
          failedToAddMovie: "Failed to add movie.",
          close: "Close",
          home: "Home",
          raspberryAwards: "Raspberry Awards",
          analytics: "Analytics",
          about: "About",
          contact: "Contact",
          aboutUs: "About Us",
          aboutDescription: "The Raspberry Awards, also known as the Razzies, is a parody award show honoring the worst of cinematic under-achievements. Join us as we celebrate the best of the worst in the film industry.",
          producerAnalytics: "Producer Analytics",
          largestGap: "Longest Gap Between Wins",
          producerName: "Producer Name",
          largestGapYears: "Longest Gap (years)",
          fastestWins: "Quickest Wins",
          fastestGapYears: "Shortest Gap (years)",
          numberOfMovies: "Total Number of Movies",
          loading: "Loading...",
          uploadCSV: "Upload CSV",
          uploadCSVMessage: "You can also upload a CSV file with the correct format to save to the table"
        }
      },
      pt: {
        translation: {
          welcome: "Bem-vindo aos Prêmios Framboesa",
          description: "Descubra tudo sobre os Raspberry Awards, a premiação que celebra os piores filmes do ano. Estamos dedicados a proporcionar a melhor experiência para você.",
          learnMore: "Saiba Mais",
          addMovie: "Adicionar Filme",
          title: "Título",
          year: "Ano",
          producers: "Produtores",
          studios: "Estúdios",
          winner: "Vencedor",
          actions: "Ações",
          update: "Atualizar",
          delete: "Excluir",
          itemsPerPage: "Itens por página",
          previous: "Anterior",
          next: "Próximo",
          error: "Erro",
          failedToFetchMovies: "Falha ao buscar filmes.",
          failedToDeleteMovie: "Falha ao excluir filme.",
          failedToUpdateMovie: "Falha ao atualizar filme.",
          failedToAddMovie: "Falha ao adicionar filme.",
          close: "Fechar",
          home: "Início",
          raspberryAwards: "Prêmios Framboesa",
          analytics: "Análise",
          about: "Sobre",
          contact: "Contato",
          aboutUs: "Sobre Nós",
          aboutDescription: "Os Prêmios Framboesa, também conhecidos como Razzies, são uma paródia de premiação que homenageia o pior do cinema. Junte-se a nós enquanto celebramos o melhor do pior na indústria cinematográfica.",
          producerAnalytics: "Análise de Produtores",
          largestGap: "Maior Intervalo Entre Vitórias",
          producerName: "Nome do Produtor",
          largestGapYears: "Maior Intervalo (anos)",
          fastestWins: "Vitórias Mais Rápidas",
          fastestGapYears: "Menor Intervalo (anos)",
          numberOfMovies: "Número Total de Filmes",
          loading: "Carregando...",
          uploadCSV: "Carregar CSV",
          uploadCSVMessage: "Você também pode carregar um arquivo CSV com o formato correto para salvar na tabela"
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;