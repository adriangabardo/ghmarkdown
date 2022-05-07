import React from 'react';
import { Anchor, Breadcrumbs } from '@mantine/core';
import { useRouter } from 'next/router';

interface Crumb {
  path: string;
  href: string;
}

/**
 * Reducer to transform an array of router paths into Crumbs
 */
const pathToCrumb = (previous: Crumb[], current: string) => {
  const next: Crumb = {
    path: current,
    href: [previous.map((prev) => prev.href), current].join('/'),
  };

  return [...previous, next];
};

/**
 * Our default crumb utilised as the initial value of our reducer
 */
const homeCrumb: Crumb = { path: 'Home', href: '/' };

export default function DynamicBreadcrumbs() {
  const router = useRouter();

  const linkPath = router.asPath.split('/').filter((path) => path !== '');

  const crumbs = linkPath.reduce(pathToCrumb, [homeCrumb]).map((item, index) => (
    <Anchor href={item.href} key={index}>
      {decodeURI(item.path)}
    </Anchor>
  ));

  return <Breadcrumbs separator="→">{crumbs}</Breadcrumbs>;
}
