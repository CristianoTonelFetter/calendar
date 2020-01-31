const randomHexColor = (): string =>
  `#${Math.random()
    .toString(16)
    .substr(2, 6)}`;

export default randomHexColor;
