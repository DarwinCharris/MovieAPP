// components/PopularMovies/PopularMovies.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  fetchMoviesByGenre,
  fetchGenres,
  Movie,
  Genre,
} from "../../service/api";
import MovieCard from "../movieCard";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Cargar géneros al montar el componente
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error("Error loading genres:", err);
      } finally {
        setLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  // Cargar películas cuando cambia el género seleccionado o página
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesByGenre(selectedGenre, page);

        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prev) => [...prev, ...data.results]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, page]);

  const handleGenrePress = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setPage(1); // Resetear a la primera página
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  };

  if (loadingGenres) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Películas{" "}
        {selectedGenre
          ? genres.find((g) => g.id === selectedGenre)?.name
          : "Populares"}
      </Text>

      {/* Panel horizontal de géneros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreContainer}
        contentContainerStyle={styles.genreContent}
      >
        <TouchableOpacity
          style={[
            styles.genreButton,
            !selectedGenre && styles.selectedGenreButton,
          ]}
          onPress={() => handleGenrePress(null)}
        >
          <Text
            style={[
              styles.genreText,
              !selectedGenre && styles.selectedGenreText,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              selectedGenre === genre.id && styles.selectedGenreButton,
            ]}
            onPress={() => handleGenrePress(genre.id)}
          >
            <Text
              style={[
                styles.genreText,
                selectedGenre === genre.id && styles.selectedGenreText,
              ]}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de películas */}
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => console.log("Pressed:", item.title)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  genreContainer: {
    marginBottom: 15,
    maxHeight: 50,
  },
  genreContent: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  genreButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  selectedGenreButton: {
    backgroundColor: "#ff0000",
  },
  genreText: {
    color: "#333",
    fontSize: 14,
  },
  selectedGenreText: {
    color: "white",
    fontWeight: "bold",
  },
  listContent: {
    alignItems: "center",
  },
  loadingContainer: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PopularMovies;
