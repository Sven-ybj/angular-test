import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

    public static handlers: { [key: string]: DetachedRouteHandle } = {}

    private static waitDelete:string

    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle) {
        if(SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete==this.getRouteUrl(route)){
            //如果待删除是当前路由则不存储快照
            SimpleReuseStrategy.waitDelete=null
            return;
        }
        SimpleReuseStrategy.handlers[this.getRouteUrl(route)] = handle
    }

    /** 若 path 在缓存中有的都认为允许还原路由 */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!SimpleReuseStrategy.handlers[this.getRouteUrl(route)]
    }

    /** 从缓存中获取快照，若无则返回nul */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null
        }
        return SimpleReuseStrategy.handlers[this.getRouteUrl(route)]
    }

    /** 进入路由触发，判断是否同一路由 */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {        
        return future.routeConfig===curr.routeConfig && 
            JSON.stringify(future.queryParams)==JSON.stringify(curr.queryParams);
    }

    private getRouteUrl(route: ActivatedRouteSnapshot){
        return route['_routerState'].url.replace(/\//g,'_')
    }
    public static deleteRouteSnapshot(name:string){
        if(SimpleReuseStrategy.handlers[name]){
            // if(SimpleReuseStrategy.handlers[name].componentRef){
            //     SimpleReuseStrategy.handlers[name].componentRef.destroy();
            // }
            delete SimpleReuseStrategy.handlers[name];
        }else{
            SimpleReuseStrategy.waitDelete=name;
        }
    }
}