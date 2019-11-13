module.exports = {
  skeletonInitial: t => {
    t.setData({
      pageIsReady: false,
      skeletonLoadingTypes: ['spin', 'chiaroscuro', 'shine', 'null'],
      skeletonSelectedLoadingType: 'shine',
      skeletonIsDev: false,
      skeletonBgcolor: '#FFF'
    });
  },
  closeSkeleton: t => {
    t.setData({
      pageIsReady: true
    });
  }
};