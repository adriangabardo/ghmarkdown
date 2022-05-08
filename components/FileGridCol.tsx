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
    <Grid.Col md={3} lg={4}>
      <Card shadow="sm" p="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Card.Section component="a" href={`/${encodeURI(file.path)}`}>
          <AspectRatio ratio={16 / 9} mx="auto">
            <Image
              src={file.image ?? 'https://source.unsplash.com/random'}
              alt={file.name}
              sx={{ '&:hover': { opacity: 0.8 } }}
            />
          </AspectRatio>
        </Card.Section>

        <Group
          position="apart"
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
            ...(file.description ? {} : { flexGrow: 1 }),
          }}
        >
          <Text weight={500} sx={{ textTransform: 'capitalize' }}>
            {file.name.replace('.md', '').toLowerCase()}
          </Text>
        </Group>

        {file.description ? (
          <Text size="sm" style={{ lineHeight: 1.5 }}>
            {file.description}
          </Text>
        ) : null}

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
