import {
  AspectRatio,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Book } from 'tabler-icons-react';
import { MarkdownFile } from '../util/extractMarkdownFromContent';

export default function FileGridCol({ file }: { file: MarkdownFile }) {
  const theme = useMantineTheme();

  return (
    <Grid.Col
      md={3}
      lg={4}
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
      }}
    >
      <Card shadow="sm" p="lg">
        <Card.Section component="a" href={`/${encodeURI(file.path)}`}>
          <AspectRatio ratio={16 / 9} mx="auto">
            <Image src="https://source.unsplash.com/random" alt="Norway" />
          </AspectRatio>
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500} sx={{ textTransform: 'capitalize' }}>
            {file.name.replace('.md', '')}
          </Text>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component="a"
          leftIcon={<Book size={14} />}
          href={`/${encodeURI(file.path)}`}
        >
          Read More
        </Button>
      </Card>
    </Grid.Col>
  );
}
