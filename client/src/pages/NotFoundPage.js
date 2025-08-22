import React from 'react';
import PlaceholderPage from '../components/common/PlaceholderPage';

const NotFoundPage = () => {
  return (
    <PlaceholderPage
      title="Page Not Found"
      description="The page you're looking for doesn't exist. Please check the URL or return to the homepage."
      showBackButton={true}
    />
  );
};

export default NotFoundPage; 