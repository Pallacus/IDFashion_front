import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Comment } from "../interfaces/comments.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = 'http://localhost:3000/api/comments';

  private httpClient = inject(HttpClient);

  getAll() {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}`)
    );
  }

  getCommentsByProductId(product_id: any) {
    return firstValueFrom(
      this.httpClient.get<Comment[]>(`${this.baseUrl}/product/${product_id}`)
    )
  }

  create(newComment: Comment) {
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/new`, newComment)
    )
  }

  deleteComment(comment_id: any) {  //  revisar
    //  DELETE {{host}}/api/comments/3
    return firstValueFrom(
      this.httpClient.delete(`${this.baseUrl}/${comment_id}`)
    )
  }

}