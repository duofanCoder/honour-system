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
export namespace Table {
    export interface Pageable {
        pageNum: number;
        pageSize: number;
        total: number;
    }

    export interface TableStateProps {
        tableData: any[];
        pageable: Pageable;
        searchParam: {
            [key: string]: any;
        };
        searchInitParam: {
            [key: string]: any;
        };
        totalParam: {
            [key: string]: any;
        };
        icon?: {
            [key: string]: any;
        };
    }
}
