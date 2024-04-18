/**
 * @fileoverview All types related to the content: posts and tags.
 */

/**
 * Represents an item in the top navigation menu.
 *
 * @property name - The display name of the navigation item.
 * @property href - The URL or path to navigate to when the item is clicked.
 */
export type TopNavItem = {
  name: string;
  href: string;
};

/**
 * Represents a social media or external link object.
 *
 * @property name - The name of the social media or external link.
 * @property icon - The name of the icon to use from the Social Icons set.
 * @property href - The URL or path to navigate to when the social media or external link is clicked.
 */
export type SocialObject = {
  name: string;
  icon: string;
  href: string;
};
