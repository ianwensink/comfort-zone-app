import Color from 'color';

const colors = {
  brand: {
    primary: '#0f9fee',
    secondary: '#17233D',
  },
};

colors.brand.darken15 = Color(colors.brand.primary).darken(0.15).hex();

export {
  colors
}
