export const layoutContainerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export function sectionIdFromHref(href: string): string {
  return href.startsWith('#') ? href.slice(1) : href;
}

export function scrollToElementById(id: string): boolean {
  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  return true;
}

export function scrollToHref(href: string): boolean {
  return scrollToElementById(sectionIdFromHref(href));
}