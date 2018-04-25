-- Database: LaValleeDesEnfants

-- DROP DATABASE "LaValleeDesEnfants";

CREATE DATABASE "LaValleeDesEnfants"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'French_France.1252'
    LC_CTYPE = 'French_France.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


-- Table: public."Enfant"

-- DROP TABLE public."Enfant";

CREATE TABLE public."Enfant"
(
    id_enfant character varying COLLATE "default".pg_catalog NOT NULL,
    nom_enfant character varying(255) COLLATE "default".pg_catalog NOT NULL,
    prenom_enfant character varying(255) COLLATE "default".pg_catalog NOT NULL,
    date_naissance_enfant date NOT NULL,
    sexe character varying(1) COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "Enfant_pkey" PRIMARY KEY (id_enfant)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Enfant"
    OWNER to postgres;

-- Table: public."Parent"

-- DROP TABLE public."Parent";

CREATE TABLE public."Parent"
(
    id_parent character varying COLLATE "default".pg_catalog NOT NULL,
    nom_de_naissance character varying(255) COLLATE "default".pg_catalog NOT NULL,
    nom_d_usage character varying(255) COLLATE "default".pg_catalog NOT NULL,
    prenom_parent character varying(255) COLLATE "default".pg_catalog NOT NULL,
    telephone character varying(10) COLLATE "default".pg_catalog NOT NULL,
    mail character varying(255) COLLATE "default".pg_catalog NOT NULL,
    profession character varying(255) COLLATE "default".pg_catalog,
    CONSTRAINT "Parent_pkey" PRIMARY KEY (id_parent)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Parent"
    OWNER to postgres;


-- Table: public."AssMat"

-- DROP TABLE public."AssMat";

CREATE TABLE public."AssMat"
(
    id_am character varying COLLATE "default".pg_catalog NOT NULL,
    nom_naissance_am character varying(255) COLLATE "default".pg_catalog NOT NULL,
    prenom_am character varying(255) COLLATE "default".pg_catalog NOT NULL,
    tel_am character varying(10) COLLATE "default".pg_catalog NOT NULL,
    nb_semaines_conges integer NOT NULL,
    date_naissance_am date NOT NULL,
    ville_naissance_am character varying(255) COLLATE "default".pg_catalog NOT NULL,
    numero_ss character varying COLLATE "default".pg_catalog NOT NULL,
    date_agrement date NOT NULL,
    reference_agrement character varying COLLATE "default".pg_catalog NOT NULL,
    assurance_resp_civile character varying COLLATE "default".pg_catalog NOT NULL,
    num_police character varying COLLATE "default".pg_catalog NOT NULL,
    login character varying(255) COLLATE "default".pg_catalog NOT NULL,
    mot_de_passe_am character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "AssMat_pkey" PRIMARY KEY (id_am)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."AssMat"
    OWNER to postgres;


-- Table: public."TypeContrat"

-- DROP TABLE public."TypeContrat";

CREATE TABLE public."TypeContrat"
(
    id_type character varying(5) COLLATE "default".pg_catalog NOT NULL,
    nom_type character varying(255) COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "TypeContrat_pkey" PRIMARY KEY (id_type)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."TypeContrat"
    OWNER to postgres;


-- Table: public."TypeJour"

-- DROP TABLE public."TypeJour";

CREATE TABLE public."TypeJour"
(
    id_type character varying COLLATE "default".pg_catalog NOT NULL,
    libelle character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "TypeJour_pkey" PRIMARY KEY (id_type)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."TypeJour"
    OWNER to postgres;


-- Table: public."Post"

-- DROP TABLE public."Post";

CREATE TABLE public."Post"
(
    id_post character varying COLLATE "default".pg_catalog NOT NULL,
    date_post date NOT NULL,
    texte text COLLATE "default".pg_catalog NOT NULL,
    image bytea NOT NULL,
    id_am character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "Post_pkey" PRIMARY KEY (id_post),
    CONSTRAINT "Post_id_am_fkey" FOREIGN KEY (id_am)
        REFERENCES public."AssMat" (id_am) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Post"
    OWNER to postgres;

-- Table: public."PeriodeConges"

-- DROP TABLE public."PeriodeConges";

CREATE TABLE public."PeriodeConges"
(
    "dateDebut" date NOT NULL,
    "dateFin" date NOT NULL,
    id_periode character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "PeriodeConges_pkey" PRIMARY KEY (id_periode)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."PeriodeConges"
    OWNER to postgres;

-- Table: public."EtreEnConges"

-- DROP TABLE public."EtreEnConges";

CREATE TABLE public."EtreEnConges"
(
    id_am character varying COLLATE "default".pg_catalog NOT NULL,
    id_periode character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "EtreEnConges_pkey" PRIMARY KEY (id_am, id_periode),
    CONSTRAINT "EtreEnConges_id_am_fkey" FOREIGN KEY (id_am)
        REFERENCES public."AssMat" (id_am) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "EtreEnConges_id_periode_fkey" FOREIGN KEY (id_periode)
        REFERENCES public."PeriodeConges" (id_periode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."EtreEnConges"
    OWNER to postgres;

-- Table: public."APourParent"

-- DROP TABLE public."APourParent";

CREATE TABLE public."APourParent"
(
    id_enfant character varying COLLATE "default".pg_catalog NOT NULL,
    id_parent character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "APourParent_pkey" PRIMARY KEY (id_enfant, id_parent),
    CONSTRAINT "APourParent_id_enfant_fkey" FOREIGN KEY (id_enfant)
        REFERENCES public."Enfant" (id_enfant) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "APourParent_id_parent_fkey" FOREIGN KEY (id_parent)
        REFERENCES public."Parent" (id_parent) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."APourParent"
    OWNER to postgres;

-- Table: public."Compte"

-- DROP TABLE public."Compte";

CREATE TABLE public."Compte"
(
    id_compte character varying(5) COLLATE "default".pg_catalog NOT NULL,
    mot_de_passe character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "Compte_pkey" PRIMARY KEY (id_compte)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Compte"
    OWNER to postgres;

-- Table: public."Disposer"

-- DROP TABLE public."Disposer";

CREATE TABLE public."Disposer"
(
    id_parent character varying COLLATE "default".pg_catalog NOT NULL,
    id_compte character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "Disposer_pkey" PRIMARY KEY (id_compte, id_parent),
    CONSTRAINT "Disposer_id_compte_fkey" FOREIGN KEY (id_compte)
        REFERENCES public."Compte" (id_compte) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Disposer_id_parent_fkey" FOREIGN KEY (id_parent)
        REFERENCES public."Parent" (id_parent) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Disposer"
    OWNER to postgres;


-- Table: public."ModeDePaiement"

-- DROP TABLE public."ModeDePaiement";

CREATE TABLE public."ModeDePaiement"
(
    id_mode character varying COLLATE "default".pg_catalog NOT NULL,
    nom_mode character varying(255) COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "ModeDePaiement_pkey" PRIMARY KEY (id_mode)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."ModeDePaiement"
    OWNER to postgres;

-- Table: public."Frais"

-- DROP TABLE public."Frais";

CREATE TABLE public."Frais"
(
    id_frais character varying COLLATE "default".pg_catalog NOT NULL,
    nom_frais character varying COLLATE "default".pg_catalog NOT NULL,
    tarif numeric NOT NULL,
    CONSTRAINT "Frais_pkey" PRIMARY KEY (id_frais)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Frais"
    OWNER to postgres;


-- Table: public."Contrat"

-- DROP TABLE public."Contrat";

CREATE TABLE public."Contrat"
(
    id_contrat character varying COLLATE "default".pg_catalog NOT NULL,
    date_paiement date,
    date_debut date,
    nb_semaines_conges_parents integer,
    tarif numeric,
    nb_heures_semaine numeric,
    taux_majore numeric,
    date_deb_periode_adaptation date,
    date_fin_periode_adaptation date,
    id_enfant character varying COLLATE "default".pg_catalog NOT NULL,
    id_mode_paiement character varying COLLATE "default".pg_catalog,
    id_am character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "Contrat_pkey" PRIMARY KEY (id_contrat),
    CONSTRAINT "Contrat_id_am_fkey" FOREIGN KEY (id_am)
        REFERENCES public."AssMat" (id_am) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Contrat_id_enfant_fkey" FOREIGN KEY (id_enfant)
        REFERENCES public."Enfant" (id_enfant) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Contrat_id_mode_paiement_fkey" FOREIGN KEY (id_mode_paiement)
        REFERENCES public."ModeDePaiement" (id_mode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Contrat"
    OWNER to postgres;

-- Table: public."PresenceTheorique"

-- DROP TABLE public."PresenceTheorique";

CREATE TABLE public."PresenceTheorique"
(
    heure_arrivee time without time zone NOT NULL,
    heure_depart time without time zone NOT NULL,
    prend_gouter boolean NOT NULL,
    id_contrat character varying COLLATE "default".pg_catalog NOT NULL,
    id_type_jour character varying COLLATE "default".pg_catalog NOT NULL,
    id_presence_theorique character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "PresenceTheorique_pkey" PRIMARY KEY (id_presence_theorique),
    CONSTRAINT "PresenceTheorique_id_contrat_fkey" FOREIGN KEY (id_contrat)
        REFERENCES public."Contrat" (id_contrat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "PresenceTheorique_id_type_jour_fkey" FOREIGN KEY (id_type_jour)
        REFERENCES public."TypeJour" (id_type) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."PresenceTheorique"
    OWNER to postgres;

-- Table: public."FactureMensuelle"

-- DROP TABLE public."FactureMensuelle";

CREATE TABLE public."FactureMensuelle"
(
    id_facture character varying COLLATE "default".pg_catalog NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    nb_jours_activite integer NOT NULL,
    nb_heures_normales numeric NOT NULL,
    nb_heures_supp numeric NOT NULL,
    nb_jours_conges_payes integer NOT NULL,
    id_contrat character varying COLLATE "default".pg_catalog NOT NULL,
    CONSTRAINT "FactureMensuelle_pkey" PRIMARY KEY (id_facture),
    CONSTRAINT "FactureMensuelle_id_contrat_fkey" FOREIGN KEY (id_contrat)
        REFERENCES public."Contrat" (id_contrat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."FactureMensuelle"
    OWNER to postgres;

-- Table: public."PresenceReelle"

-- DROP TABLE public."PresenceReelle";

CREATE TABLE public."PresenceReelle"
(
    "datePresenceReelle" date,
    heure_arrivee_r time without time zone,
    heure_depart_r time without time zone,
    prend_gouter_r boolean,
    id_presence_theo character varying COLLATE "default".pg_catalog NOT NULL,
    id_presence_reelle character varying COLLATE "default".pg_catalog NOT NULL,
    id_facture character varying COLLATE "default".pg_catalog,
    CONSTRAINT "PresenceReelle_pkey" PRIMARY KEY (id_presence_reelle),
    CONSTRAINT "PresenceReelle_id_facture_fkey" FOREIGN KEY (id_facture)
        REFERENCES public."FactureMensuelle" (id_facture) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "PresenceReelle_id_presence_theo_fkey" FOREIGN KEY (id_presence_theo)
        REFERENCES public."PresenceTheorique" (id_presence_theorique) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."PresenceReelle"
    OWNER to postgres;