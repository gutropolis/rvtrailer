import { UserDetailMessageComponent } from './shared/user-detail-message/user-detail-message.component';
import { EditAboutUserComponent } from './shared/edit-about-user/edit-about-user.component';
import { UserDashboardComponent } from './routes/user-dashboard/user-dashboard.component';
import { AdminViewListTrailerComponent } from './admin/admin-view-list-trailer/admin-view-list-trailer.component';
import { AdminEditListTrailerComponent } from './admin/admin-edit-list-trailer/admin-edit-list-trailer.component';
import { AdminAddListTrailerComponent } from './admin/admin-add-list-trailer/admin-add-list-trailer.component';
import { AdminListTrailerComponent } from './admin/admin-list-trailer/admin-list-trailer.component';
import { AdminViewCmsPageComponent } from './admin/admin-view-cms-page/admin-view-cms-page.component';
import { AdminCmsPageComponent } from './admin/admin-cms-page/admin-cms-page.component';
import { AdminAddCmsPageComponent } from './admin/admin-add-cms-page/admin-add-cms-page.component';
import { AdminChangePassComponent } from './admin/admin-change-pass/admin-change-pass.component';
import { AdminForgotPassComponent } from './admin/admin-forgot-pass/admin-forgot-pass.component';
import { AdminEditUserComponent } from './admin/admin-edit-user/admin-edit-user.component';
import { AdminViewUserComponent } from './admin/admin-view-user/admin-view-user.component';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import { RvsListingComponent } from './shared/rvs-listing/rvs-listing.component';
import { HomeComponent } from './routes/home/home.component';
 import { NotFoundComponent } from './routes/not-found/not-found.component';
import { RvListsComponent } from './shared/rv-lists/rv-lists.component';
import { RvDetailComponent } from './routes/rv-detail/rv-detail.component';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
import { SignupRenterComponent } from './shared/signup-renter/signup-renter.component';
import { SignupOwnerComponent } from './shared/signup-owner/signup-owner.component';
import { ListTrailerComponent } from './routes/list-trailer/list-trailer.component';
import { TrailerSpecificationComponent } from './shared/trailer-specification/trailer-specification.component';
import { TrailerLocationComponent } from './shared/trailer-location/trailer-location.component';
import { ContactUsComponent } from './routes/contact-us/contact-us.component';
import { TrailerDetailComponent } from './shared/trailer-detail/trailer-detail.component';
import { TrailerPricingComponent } from './shared/trailer-pricing/trailer-pricing.component';
import { TrailerPhotoComponent } from './shared/trailer-photo/trailer-photo.component';
import { BlogComponent } from './routes/blog/blog.component';
import { BlogDetailComponent } from './routes/blog-detail/blog-detail.component';
import { AboutUsComponent } from './routes/about-us/about-us.component';

import { TermsConditionComponent } from './routes/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './routes/privacy-policy/privacy-policy.component';


import { SubscribePlanComponent } from './routes/subscribe-plan/subscribe-plan.component';


import { FaqRenterComponent } from './routes/faq-renter/faq-renter.component';
import { FaqOwnerComponent } from './routes/faq-owner/faq-owner.component';
import { DashboardRenterComponent } from './routes/dashboard-renter/dashboard-renter.component';
import { AboutUserComponent } from './shared/about-user/about-user.component';
import { UserFavouriteComponent } from './shared/user-favourite/user-favourite.component';
import { UserMessageComponent } from './shared/user-message/user-message.component';
import { MsgDetailComponent } from './shared/msg-detail/msg-detail.component';
import { UserReviewComponent } from './shared/user-review/user-review.component';
import { DashboardOwnerComponent } from './routes/dashboard-owner/dashboard-owner.component';
import { AboutOwnerComponent } from './shared/about-owner/about-owner.component';
import { OwnerMsgComponent } from './shared/owner-msg/owner-msg.component';
import { MsgDetailOwnerComponent } from './shared/msg-detail-owner/msg-detail-owner.component';
import { OwnerReviewComponent } from './shared/owner-review/owner-review.component';
import { OwnerPackageComponent } from './shared/owner-package/owner-package.component';
import { OwnerAdsComponent } from './shared/owner-ads/owner-ads.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminEditCmsPageComponent } from './admin/admin-edit-cms-page/admin-edit-cms-page.component';
import { RvComponent } from './routes/rv/rv.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AddRentalTypeComponent } from './admin/add-rental-type/add-rental-type.component';
import { ViewRentalTypeComponent } from './admin/view-rental-type/view-rental-type.component';
import { ShowRentalTypeComponent } from './admin/show-rental-type/show-rental-type.component';
import { EditRentalTypeComponent } from './admin/edit-rental-type/edit-rental-type.component';
import { AdminFeaturesComponent } from './admin/admin-features/admin-features.component';
import { AdminAddFeaturesComponent } from './admin/admin-add-features/admin-add-features.component';
import { AdminEditFeaturesComponent } from './admin/admin-edit-features/admin-edit-features.component';
import { AdminViewFeaturesComponent } from './admin/admin-view-features/admin-view-features.component';
import { OwnerEditListtrailerComponent } from './shared/owner-edit-listtrailer/owner-edit-listtrailer.component';
import { AdminPackageComponent } from './admin/admin-package/admin-package.component';
import { AdminAddPackageComponent } from './admin/admin-add-package/admin-add-package.component';
import { AdminEditPackageComponent } from './admin/admin-edit-package/admin-edit-package.component';
import { AdminViewPackageComponent } from './admin/admin-view-package/admin-view-package.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
export const Routing = RouterModule.forRoot([
    {
        path: '',
        component: HomeComponent
    },
    // {
    //     path: 'rv',
    //     component: RvComponent,
    //      children: [
    //         {
    //             path: '',
    //             component: RvsListingComponent
    //         },
    //         {
    //             path: 'rv-list',
    //             component: RvsListingComponent
    //         },
    //         {
    //             path: 'rv/:id',
    //             component: RvDetailComponent
    //         }
    //     ]
    // },
    {
        path: 'rv',
        component: RvsListingComponent
    },
    {
        path: 'rvs/:location/:from/:to',
        component: RvsListingComponent
    },
    {
        path: 'rv/:id',
        component: RvDetailComponent
    },
    {
        path: 'rv/:?',
        component: RvDetailComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent,
        children: [
            {
                path: '',
                component: SignupRenterComponent
            },
            {
                path: 'renter',
                component: SignupRenterComponent
            },
            {
                path: 'owner',
                component: SignupOwnerComponent
            }
        ]
    },
    {
        path: 'list-trailer',
        component: ListTrailerComponent,
            children: [
            {
                path: '',
                component: TrailerSpecificationComponent
            },
            {
                path: 'specification',
                component: TrailerSpecificationComponent
            },
            {
                path: 'location',
                component: TrailerLocationComponent
            },
            {
                path: 'details',
                component: TrailerDetailComponent
            },
            {
                path: 'pricing',
                component: TrailerPricingComponent
            },
            {
                path: 'photo',
                component: TrailerPhotoComponent
            }

        ]
    },
    {
        path: 'edit-list-trailer/:id',
        component: OwnerEditListtrailerComponent
    },
	
    
    {
      path: 'contact-us',
      component: ContactUsComponent
    },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'user', component: AdminUserComponent, canActivate: [AuthGuard] },
            { path: 'add-user', component: AdminAddUserComponent, canActivate: [AuthGuard] },
            { path: 'view-user/:id', component: AdminViewUserComponent, canActivate: [AuthGuard] },
            { path: 'edit-user/:id', component: AdminEditUserComponent, canActivate: [AuthGuard] },
            { path: 'forgot', component: AdminForgotPassComponent },
            { path: 'change-password', component: AdminChangePassComponent },
            { path: 'cmspage', component: AdminCmsPageComponent },
            { path: 'add-cmspage', component: AdminAddCmsPageComponent },
            { path: 'view-cmspage/:id', component: AdminViewCmsPageComponent },
            { path: 'edit-cmspage/:id', component: AdminEditCmsPageComponent },
            { path: 'list-trailer', component: AdminListTrailerComponent },
            { path: 'add-list-trailer', component: AdminAddListTrailerComponent },
            { path: 'edit-list-trailer/:id', component: AdminEditListTrailerComponent },
            { path: 'view-list-trailer/:id', component: AdminViewListTrailerComponent },
            { path: 'rental-type', component: AddRentalTypeComponent },
            { path: 'view_rental-type', component: ViewRentalTypeComponent },
            { path: 'show_rental_type/:id', component: ShowRentalTypeComponent },
            { path: 'edit_rental_type/:id', component: EditRentalTypeComponent },
            { path: 'features', component: AdminFeaturesComponent },
            { path: 'add-features', component: AdminAddFeaturesComponent },
            { path: 'view-features/:id', component: AdminViewFeaturesComponent },
            { path: 'edit-features/:id', component: AdminEditFeaturesComponent },
            { path: 'package', component: AdminPackageComponent },
            { path: 'add-package', component: AdminAddPackageComponent },
            { path: 'edit-package/:id', component: AdminEditPackageComponent },
            { path: 'view-package/:id', component: AdminViewPackageComponent },
            { path: 'datepicker', component: DatepickerComponent },
        ]
    },

    { path: 'admin-login', component: AdminLoginComponent, canActivate: [NotAuthGuard] },

    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog/:id',
        component: BlogDetailComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'faq-renter',
        component: FaqRenterComponent
    },
    {
        path: 'faq-owner',
        component: FaqOwnerComponent
    },
    {
        path: 'subscribe-plan',
        component: SubscribePlanComponent
    },
    {
        path: 'subscribe-plan/:id',
        component: SubscribePlanComponent
    },

    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'term-conditions',
        component: TermsConditionComponent
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        children: [
            {
                path: '',
                component: AboutUserComponent
            },
            {
                path: 'about',
                component: AboutUserComponent
            },
            {
                path: 'my-ads',
                component: OwnerAdsComponent
            },
            {
                path: 'message',
                component: UserMessageComponent
            },
            {
                path: 'all-detail-messages/:id',
                component: UserDetailMessageComponent
            },
            {
                path: 'package',
                component: OwnerPackageComponent
            },
            {
                path: 'message/:id',
                component: MsgDetailComponent
            },
            {
                path: 'review',
                component: OwnerReviewComponent
            },
            {
                path: 'favourite',
                component: UserFavouriteComponent
            },
            {
                path: 'edit_user_details',
                component: EditAboutUserComponent
            }


        ]
    },


    {
        path: '404',
        component: NotFoundComponent
    },
    {
    path: '**',
        redirectTo: '/404'
    }
]);
