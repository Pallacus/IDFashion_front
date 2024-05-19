import { Component, inject } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
declare const bootstrap: any;
import { Product } from '../../interfaces/product.interface';
import { Comment } from '../../interfaces/comments.interface';
import { Category } from '../../interfaces/categories.interface';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { CommentsService } from '../../services/comments.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    imports: [FormsModule, ReactiveFormsModule],
})
export class ProductDetailComponent {

    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);

    categoriesService = inject(CategoriesService);
    commentService = inject(CommentsService);
    productsService = inject(ProductsService);
    favoritesService = inject(FavoritesService);

    formularioComment: FormGroup;

    product: Product | null = null;
    arrComments: Comment[] = [];
    category: Category | any;
    user_id: number = 0;
    kart: string | null = '';
    arrKart: Product[] = [];
    favorite_id: number = 0;
    isFavorite: boolean = false;

    ngOnInit() {
        if (localStorage['token']) {
            const decodedToken: any = jwtDecode(localStorage['token']);
            this.user_id = decodedToken.id;
        }

        this.activatedRoute.params.subscribe(async (params) => {
            let errorText = 'Error acquiring category';

            try {
                this.product = await this.productsService.getById(params['idproduct']);

                if (this.product.id === undefined) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Product doesn`t exist, redirect to home', // ?
                        icon: 'error',
                    });
                    return;
                }
                this.category = await this.categoriesService.getById(
                    this.product.categories_id
                );
                errorText = 'Error acquiring comments';

                this.arrComments = await this.commentService.getCommentsByProductId(params['idproduct']);

            } catch (error: any) {
                Swal.fire({
                    title: 'Error',
                    text: errorText,
                    icon: 'error',
                });
            }
            try {
                const result: any =
                    await this.favoritesService.getFavoritesByUserIdAndProductId(
                        this.user_id,
                        this.product!.id
                    ); //

                if (result) {
                    this.favorite_id = result.id;
                    this.isFavorite = true;
                } else {
                    this.isFavorite = false;
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    `An error has occurred with the server. We apologize for the inconvenience.`,
                    'error'
                );
            }
        });
    }

    ngAfterContentInit() {
        const myCarousel = document.querySelector('#commentsCarousel');
        var carousel = new bootstrap.Carousel(myCarousel)

    }

    async onClickFavorite() {
        if (!this.isFavorite) {
            this.isFavorite = true;
            const newFavorite = {
                users_id: this.user_id,
                products_id: this.product?.id,
            };

            try {
                const favorite: any = await this.favoritesService.createFavorite(
                    newFavorite
                );
                this.favorite_id = favorite.id;
            } catch (error: any) { }
        } else {
            this.isFavorite = false;
            try {
                const response = await this.favoritesService.deleteFavorite(
                    this.favorite_id
                );
            } catch (error: any) { }
        }
    }

    // Coment Box

    constructor() {
        this.formularioComment = new FormGroup({
            users_id: new FormControl(0, [Validators.required]),
            products_id: new FormControl(0, [Validators.required]),
            text: new FormControl(null, [Validators.required]),
        });
    }

    async onSubmit() {
        this.formularioComment.value.users_id = this.user_id;
        this.formularioComment.value.products_id = this.product?.id;
        console.log(this.formularioComment.value);

        if (this.user_id === 0) {
            Swal.fire({
                title: 'Error',
                text: 'You must login to share your thoughts',
                icon: 'error',
            });
        } else if (this.formularioComment.valid && this.user_id !== 0) {
            try {
                const response = await this.commentService.create(
                    this.formularioComment.value
                );
                console.log(response);
                Swal.fire({
                    title: 'success',
                    text: 'Thanks for your time',
                    icon: 'success',
                });
                this.arrComments = await this.commentService.getCommentsByProductId(this.product?.id);
                this.formularioComment.reset();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: "We're sorry. Something went wrong",
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete the form correctly',
                icon: 'error',
            });
        }
    }

    onBuy() {
        // meter el product en el kart
        if (localStorage['kart']) {
            this.kart = localStorage.getItem('kart');
            this.arrKart = JSON.parse(this.kart!);
        }
        this.arrKart.push(this.product!);
        localStorage.setItem('kart', JSON.stringify(this.arrKart));
        Swal.fire({
            title: 'Success',
            text: 'Product added to your cart',
            icon: 'success',
        });
    }
}
