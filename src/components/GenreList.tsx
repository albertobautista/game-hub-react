import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { error, data, isLoading } = useGenres();
  console.log({ error, data, isLoading });
  return <div>ss</div>;
};

export default GenreList;
