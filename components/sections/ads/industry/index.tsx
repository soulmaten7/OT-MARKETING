import type { ReactNode } from "react";

import { MetaFeedMockup }        from "../MetaFeedMockup";
import { KarrotMockup }          from "../KarrotMockup";
import { NaverSearchMockup }     from "../NaverSearchMockup";
import { KakaoMomentMockup }     from "../KakaoMomentMockup";
import { GoogleGDNMockup }       from "../GoogleGDNMockup";
import { GoogleDiscoveryMockup } from "../GoogleDiscoveryMockup";

import { MetaFeed    as Rental_Meta }      from "./rental/MetaFeed";
import { Karrot      as Rental_Karrot }    from "./rental/Karrot";
import { NaverSearch as Rental_Naver }     from "./rental/NaverSearch";
import { KakaoMoment as Rental_Kakao }     from "./rental/KakaoMoment";
import { GoogleGDN   as Rental_GDN }       from "./rental/GoogleGDN";
import { GoogleDiscovery as Rental_Disc }  from "./rental/GoogleDiscovery";

import { MetaFeed    as BB_Meta }          from "./broadband/MetaFeed";
import { Karrot      as BB_Karrot }        from "./broadband/Karrot";
import { NaverSearch as BB_Naver }         from "./broadband/NaverSearch";
import { KakaoMoment as BB_Kakao }         from "./broadband/KakaoMoment";
import { GoogleGDN   as BB_GDN }           from "./broadband/GoogleGDN";
import { GoogleDiscovery as BB_Disc }      from "./broadband/GoogleDiscovery";

import { MetaFeed    as Inv_Meta }         from "./invest/MetaFeed";
import { Karrot      as Inv_Karrot }       from "./invest/Karrot";
import { NaverSearch as Inv_Naver }        from "./invest/NaverSearch";
import { KakaoMoment as Inv_Kakao }        from "./invest/KakaoMoment";
import { GoogleGDN   as Inv_GDN }          from "./invest/GoogleGDN";
import { GoogleDiscovery as Inv_Disc }     from "./invest/GoogleDiscovery";

import { MetaFeed    as RE_Meta }          from "./realestate/MetaFeed";
import { Karrot      as RE_Karrot }        from "./realestate/Karrot";
import { NaverSearch as RE_Naver }         from "./realestate/NaverSearch";
import { KakaoMoment as RE_Kakao }         from "./realestate/KakaoMoment";
import { GoogleGDN   as RE_GDN }           from "./realestate/GoogleGDN";
import { GoogleDiscovery as RE_Disc }      from "./realestate/GoogleDiscovery";

import { MetaFeed    as Med_Meta }         from "./medical/MetaFeed";
import { Karrot      as Med_Karrot }       from "./medical/Karrot";
import { NaverSearch as Med_Naver }        from "./medical/NaverSearch";
import { KakaoMoment as Med_Kakao }        from "./medical/KakaoMoment";
import { GoogleGDN   as Med_GDN }          from "./medical/GoogleGDN";
import { GoogleDiscovery as Med_Disc }     from "./medical/GoogleDiscovery";

export type MockupConfig = {
    id: string;
    name: string;
    color: string;
    component: ReactNode;
};

export const industryMockups: Record<string, MockupConfig[]> = {
    "debt-relief": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <MetaFeedMockup /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <KarrotMockup /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <NaverSearchMockup /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <KakaoMomentMockup /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <GoogleGDNMockup /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <GoogleDiscoveryMockup /> },
    ],
    "rental": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <Rental_Meta /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <Rental_Karrot /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <Rental_Naver /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <Rental_Kakao /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <Rental_GDN /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <Rental_Disc /> },
    ],
    "broadband": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <BB_Meta /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <BB_Karrot /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <BB_Naver /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <BB_Kakao /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <BB_GDN /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <BB_Disc /> },
    ],
    "invest": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <Inv_Meta /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <Inv_Karrot /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <Inv_Naver /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <Inv_Kakao /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <Inv_GDN /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <Inv_Disc /> },
    ],
    "realestate": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <RE_Meta /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <RE_Karrot /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <RE_Naver /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <RE_Kakao /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <RE_GDN /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <RE_Disc /> },
    ],
    "medical": [
        { id: "meta",   name: "Meta 피드",        color: "#1877F2", component: <Med_Meta /> },
        { id: "karrot", name: "당근 비즈프로필",  color: "#FF7E36", component: <Med_Karrot /> },
        { id: "naver",  name: "Naver 검색광고",   color: "#03C75A", component: <Med_Naver /> },
        { id: "kakao",  name: "카카오 모먼트",    color: "#FEE500", component: <Med_Kakao /> },
        { id: "google", name: "Google GDN",       color: "#4285F4", component: <Med_GDN /> },
        { id: "google", name: "Google Discovery", color: "#EA4335", component: <Med_Disc /> },
    ],
};
