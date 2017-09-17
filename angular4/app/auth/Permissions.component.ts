import {UserPrincipal} from "./UserPrincipal.model";
import {Observable} from  'rxjs/Observable'
/**
 * Created by alex on 9/17/17.
 */

export class Permissions {


  static canActivate(userToken: UserPrincipal, path: string): Observable<boolean> {
    return Observable.of(Permissions.findPermisson(path, userToken));
  }

  private static findPermisson(path: string, userToken: UserPrincipal) : boolean {
    switch (path){
      case 'delete':
        return userToken.canDelete;
      case 'create':
        return userToken.canCreate;
      case 'update':
        return userToken.canUpdate;
      default:
        return userToken.canView;
    }
  }
}
