import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { error, genres, isLoading } = useGenres();
  console.log({ error, genres, isLoading });
  return <div></div>;
};

export default GenreList;
