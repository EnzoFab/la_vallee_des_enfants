
create table public."enfant"
(
    id_enfant serial primary key,
    nom_enfant character varying(255) not null,
    prenom_enfant character varying(255) not null,
    date_naissance_enfant date not null,
    sexe character varying(1) not null
)
with (
    oids = false
);

create table public."evenement"
(
    id_evenement serial primary key,
    libelle_evenement character varying (255) not null,
    date_debut date not null,
    date_fin date not null
)with (
    oids = false
);

-- table: public."parent"

-- drop table public."parent";

create table public."parent"
(
    id_parent serial primary key,
    nom_de_naissance character varying(255) not null,
    nom_d_usage character varying(255) not null,
    prenom_parent character varying(255) not null,
    telephone character varying(10) not null,
    mail character varying(255) not null,
    profession character varying(255)
)
with (
    oids = false
);

-- table: public."assmat"

-- drop table public."assmat";

create table public."assmat"
(
    id_am serial primary key,
    nom_naissance_am character varying(255) not null,
    prenom_am character varying(255) not null,
    tel_am character varying(10) not null,
    nb_semaines_conges integer not null,
    date_naissance_am date not null,
    ville_naissance_am character varying(255) not null,
    numero_ss character varying not null,
    date_agrement date not null,
    reference_agrement character varying not null,
    assurance_resp_civile character varying not null,
    num_police character varying not null,
    login character varying(255) not null,
    mot_de_passe_am character varying not null
)
with (
    oids = false
);

-- table: public."typecontrat"

-- drop table public."typecontrat";

create table public."typecontrat"
(
    id_type serial primary key,
    nom_type character varying(255) not null
)
with (
    oids = false
);

-- table: public."typejour"

-- drop table public."typejour";

create table public."typejour"
(
    id_type serial primary key,
    libelle character varying not null
)
with (
    oids = false
);

-- table: public."post"

-- drop table public."post";

create table public."post"
(
    id_post serial primary key,
    date_post date not null,
    texte text not null,
    image bytea not null,
    id_am integer not null,
    constraint "post_id_am_fkey" foreign key (id_am)
        references public."assmat" (id_am) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);
-- table: public."periodeconges"

-- drop table public."periodeconges";

create table public."periodeconges"
(
    "datedebut" date not null,
    "datefin" date not null,
    id_periode serial primary key

)
with (
    oids = false
);

-- table: public."etreenconges"

-- drop table public."etreenconges";

create table public."etreenconges"
(
    id_am integer not null,
    id_periode integer not null,
    constraint "etreenconges_pkey" primary key (id_am, id_periode),
    constraint "etreenconges_id_am_fkey" foreign key (id_am)
        references public."assmat" (id_am) match simple
        on update no action
        on delete no action,
    constraint "etreenconges_id_periode_fkey" foreign key (id_periode)
        references public."periodeconges" (id_periode) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);

-- table: public."apourparent"

-- drop table public."apourparent";

create table public."apourparent"
(
    id_enfant integer not null,
    id_parent integer not null,
    constraint "apourparent_pkey" primary key (id_enfant, id_parent),
    constraint "apourparent_id_enfant_fkey" foreign key (id_enfant)
        references public."enfant" (id_enfant) match simple
        on update no action
        on delete no action,
    constraint "apourparent_id_parent_fkey" foreign key (id_parent)
        references public."parent" (id_parent) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);

-- table: public."compte"

-- drop table public."compte";

create table public."compte"
(
    id_compte serial primary key,
    identifiant_connexion character varying not null
)
with (
    oids = false
);

-- table: public."disposer"

-- drop table public."disposer";

create table public."disposer"
(
    id_parent integer not null,
    id_compte integer not null,
    mot_de_passe character varying not null,
    constraint "disposer_pkey" primary key (id_compte, id_parent),
    constraint "disposer_id_compte_fkey" foreign key (id_compte)
        references public."compte" (id_compte) match simple
        on update no action
        on delete no action,
    constraint "disposer_id_parent_fkey" foreign key (id_parent)
        references public."parent" (id_parent) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);

-- table: public."modedepaiement"

-- drop table public."modedepaiement";

create table public."modedepaiement"
(
    id_mode serial primary key,
    nom_mode character varying(255) not null
)
with (
    oids = false
);

-- table: public."frais"

-- drop table public."frais";

create table public."frais"
(
    id_frais serial primary key,
    nom_frais character varying not null,
    tarif numeric not null
)
with (
    oids = false
);

-- table: public."contrat"

-- drop table public."contrat";

create table public."contrat"
(
    id_contrat character varying primary key,
    date_paiement date,
    date_debut date,
    nb_semaines_conges_parents integer,
    tarif numeric,
    nb_heures_semaine numeric,
    taux_majore numeric,
    date_deb_periode_adaptation date,
    date_fin_periode_adaptation date,
    id_enfant integer not null,
    id_mode_paiement integer,
    id_am integer not null,
    constraint "contrat_id_am_fkey" foreign key (id_am)
        references public."assmat" (id_am) match simple
        on update no action
        on delete no action,
    constraint "contrat_id_enfant_fkey" foreign key (id_enfant)
        references public."enfant" (id_enfant) match simple
        on update no action
        on delete no action,
    constraint "contrat_id_mode_paiement_fkey" foreign key (id_mode_paiement)
        references public."modedepaiement" (id_mode) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);

-- table: public."presencetheorique"

-- drop table public."presencetheorique";

create table public."presencetheorique"
(
    heure_arrivee time without time zone not null,
    heure_depart time without time zone not null,
    prend_gouter boolean not null,
    id_contrat  character varying not null,
    id_type_jour integer not null,
    id_presence_theorique serial,
    constraint "presencetheorique_pkey" primary key (id_presence_theorique),
    constraint "presencetheorique_id_contrat_fkey" foreign key (id_contrat)
        references public."contrat" (id_contrat) match simple
        on update no action
        on delete no action,
    constraint "presencetheorique_id_type_jour_fkey" foreign key (id_type_jour)
        references public."typejour" (id_type) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);

-- table: public."facturemensuelle"

-- drop table public."facturemensuelle";

create table public."facturemensuelle"
(
    id_facture serial primary key,
    date_debut date not null,
    date_fin date not null,
    nb_jours_activite integer not null,
    nb_heures_normales numeric not null,
    nb_heures_supp numeric not null,
    nb_jours_conges_payes integer not null,
    id_contrat  character varying not null,
    constraint "facturemensuelle_id_contrat_fkey" foreign key (id_contrat)
        references public."contrat" (id_contrat) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);
-- table: public."presencereelle"

-- drop table public."presencereelle";

create table public."presencereelle"
(
    "datepresencereelle" date,
    heure_arrivee_r time without time zone,
    heure_depart_r time without time zone,
    prend_gouter_r boolean,
    id_presence_theo integer,
    id_presence_reelle serial primary key,
    id_facture integer,
    constraint "presencereelle_id_facture_fkey" foreign key (id_facture)
        references public."facturemensuelle" (id_facture) match simple
        on update no action
        on delete no action,
    constraint "presencereelle_id_presence_theo_fkey" foreign key (id_presence_theo)
        references public."presencetheorique" (id_presence_theorique) match simple
        on update no action
        on delete no action
)
with (
    oids = false
);