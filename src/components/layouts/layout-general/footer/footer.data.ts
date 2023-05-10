import facebook from '../../../../assets/images/facebook.svg';
import instagram from '../../../../assets/images/instagram.svg';
import linkedin from '../../../../assets/images/linkedin.svg';
import vk from '../../../../assets/images/vk.svg';

type FooterLinkType = {
  to: string;
  img: string;
  alt: string;
};

export const footerLinks: FooterLinkType[] = [
  {
    img: facebook,
    alt: 'facebook',
    to: 'https://www.facebook.com/',
  },
  {
    img: vk,
    alt: 'vk',
    to: 'https://vk.com/',
  },
  {
    img: instagram,
    alt: 'instagram',
    to: 'https://www.instagram.com/',
  },
  {
    img: linkedin,
    alt: 'linkedin',
    to: 'https://www.linkedin.com/',
  },
];
