import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-session1',
  templateUrl: './session1.component.html',
  styleUrls: ['./session1.component.scss']
})
export class Session1Component implements OnInit {
  myId?: any = 0;

  constructor(public route: ActivatedRoute, public router: Router) {
    console.log('##################')
   }

  ngOnInit(): void {
    console.log('*********************')
    // let tmp = this.route.snapshot.paramMap.get('id');
    // if (tmp) {
    //   this.myId = +tmp;
    // }
    // let tmp = this.route.snapshot.queryParamMap.get('id');
    // if (tmp) {
    //   this.myId = +tmp;
    // }
    // let myId = this.route.paramMap.subscribe(result => {
    //   console.log('*********************')
    //   console.log(result.get('id'));
    //   let tmp =result.get('id')
    //   if (tmp) {
    //     this.myId = +tmp;
    //   }
    // })
    this.route.queryParamMap.subscribe(result => {
        console.log('*********************')
        console.log(result.get('id'));
        let tmp =result.get('id')
        if (tmp) {
          this.myId = +tmp;
        }
      })
    // console.log(myId);
  }

  goto() {
    this.router.navigate(['/to-do']);
    // this.router.navigateByUrl()
  }

  next() {
    this.router.navigate(['empty-component'],{queryParams:{id :this.myId +1}});
  }

  prev() {
    this.router.navigate(['empty-component',this.myId -1]);
  }

}
