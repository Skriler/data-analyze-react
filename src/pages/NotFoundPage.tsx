import { useSetLayout } from '@hooks/features/layout';
import { useNotFound } from '@hooks/features/notFound';
import { NotFoundContent } from '@components/NotFound';

export default function NotFoundPage() {
  const { navigation, suggestions } = useNotFound();

  useSetLayout(
    'Page Not Found',
    "The page you're looking for doesn't exist or has been moved."
  );

  return <NotFoundContent navigation={navigation} suggestions={suggestions} />;
}
