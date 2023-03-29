declare namespace App {
  /** 多页签Tab的路由 */
  interface GlobalTabRoute
    extends Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {
    /** 滚动的位置 */
    scrollPosition: {
      left: number;
      top: number;
    };
  }
}
