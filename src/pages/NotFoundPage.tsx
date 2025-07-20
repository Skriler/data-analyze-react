import { useSetLayout } from '@components/Layout';
import { useNotFound } from '@hooks/features/notFound';
import { NotFoundContent } from '@components/NotFound';

export default function NotFound() {
  const { navigation, suggestions } = useNotFound();

  useSetLayout(
    'Page Not Found',
    "The page you're looking for doesn't exist or has been moved."
  );

  return <NotFoundContent navigation={navigation} suggestions={suggestions} />;
}
