import { Component,OnInit } from '@angular/core';
import { SimpleReuseStrategy } from './SimpleReuseStrategy';
import { Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./app.component.sass'],
  providers: [SimpleReuseStrategy]
})
export class AppComponent {
  constructor(public router:Router,
    public activatedRoute:ActivatedRoute) { 

    // setTimeout(()=>{
    //   let path = this.router.url.replace(/\?.*/,"");
    //     if(path==="/test"){
    //     let r = {
    //       path:path,
    //       title:"单据录入",
    //       queryParams:this.router.currentUrlTree.queryParams
    //     }
    //     this.routerLinks.push(r);
    //   }
    // },500)
  }

  isCollapsed = false;
  titleIndex = 0;

  routerLinks = [
    { path:"/welcome",title:"welcome",queryParams:{} }
  ];
  routerOutlets = {};

  openTest(){
    this.titleIndex++;
    let r = {
      path:"/test",
      title:"单据录入"+this.titleIndex,
      queryParams:{time:Date.now()}
    }
    this.routerLinks.push(r);
    this.router.navigate([r.path],{queryParams:r.queryParams});
  }

  openTest2(){
    this.titleIndex++;
    let r = {
      path:"/test2",
      title:"单据录入2"+this.titleIndex,
      queryParams:{time:Date.now()}
    }
    this.routerLinks.push(r);
    this.router.navigate([r.path],{queryParams:r.queryParams});
  }
  
  openTest3(){
    this.titleIndex++;
    let r = {
      path:"/test3",
      title:"单据录入3"+this.titleIndex,
      queryParams:{time:Date.now()}
    }
    this.routerLinks.push(r);
    this.router.navigate([r.path],{queryParams:r.queryParams});
  }

  onActivate(e,tem){
    // this.routerOutlets[this.router.url.replace(/\//g,'_')] = tem;
    this.routerOutlets[this.router.url.replace(/\//g,'_')] = e;
    // console.log('onActivate',this.router.url)
    // console.log(e,tem)
  }

  //关闭选项标签
  closeTab(index){
    //如果只有一个不可以关闭
    if(this.routerLinks.length==1) return ;

    let tab =this.routerLinks.splice(index,1)[0];


    let closeUrl = tab.path;
    for(let k in tab.queryParams){
      let c=closeUrl.indexOf("?")>-1?"&":"?";
      closeUrl+=c+k+"="+tab.queryParams[k];
    }
    let isSelect =this.router.url === closeUrl;
    closeUrl = closeUrl.replace(/\//g,'_');
    //删除复用
    SimpleReuseStrategy.deleteRouteSnapshot(closeUrl);
    // 再次调用是为了标记在触发离开当前路由事件时不要再次保存快照
    SimpleReuseStrategy.deleteRouteSnapshot(closeUrl);
    // console.log(SimpleReuseStrategy.handlers)
    if(this.routerOutlets[closeUrl]){
      this.routerOutlets[closeUrl].ngOnDestroy();
      // this.routerOutlets[closeUrl].destroy();

      delete this.routerOutlets[closeUrl];
    }


    if(!isSelect) return;
    //显示上一个选中
    let menu=this.routerLinks[index-1];
    if(!menu) {//如果上一个没有下一个选中
       menu=this.routerLinks[index];
    }

    //显示当前路由信息
    this.router.navigate([menu.path],{queryParams:menu.queryParams});
  }
}
