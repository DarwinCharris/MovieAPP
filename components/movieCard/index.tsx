// components/movieCard/MovieCard.tsx
import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { Movie } from "../../service/api";

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poster: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#ffc107",
  },
});

export default MovieCard;
