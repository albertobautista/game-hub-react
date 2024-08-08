import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface GenreListProps {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre?: Genre | null;
}
const GenreList = ({ onSelectGenre, selectedGenre }: GenreListProps) => {
  const { error, data: genres, isLoading } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner size="xl" />;
  return (
    <List>
      {genres?.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              src={getCroppedImageUrl(genre.image_background)}
              alt={genre.name}
              boxSize="32px"
              borderRadius={8}
            />
            <Button
              onClick={() => {
                onSelectGenre(genre);
              }}
              variant="link"
              fontSize="large"
              fontWeight={selectedGenre?.id === genre.id ? "bold" : "normal"}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
