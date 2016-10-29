﻿'use strict';

import { ITranslateService } from './ITranslateService';
import { LanguageRootVar } from './ITranslateService';
import { LanguageChangedEvent } from './ITranslateService';
import { Translation } from './Translation';

export class TranslateService implements ITranslateService {
    private _translation: Translation;
    private _setRootVar: boolean;
    private _persist: boolean;
    private _rootScope: ng.IRootScopeService;
    private _storage: any;

    public constructor(
        translation: Translation,
        setRootVar: boolean,
        persist: boolean,
        $rootScope: ng.IRootScopeService,
        $window: ng.IWindowService
    ) {
        this._setRootVar = setRootVar;
        this._persist = persist;
        this._translation = translation;
        this._rootScope = $rootScope;
        this._storage = $window.localStorage;

        if (this._persist && this._storage) {
            this._translation.language = this._storage.getItem('language') 
                || this._translation.language;
        }

        this.save();
    }

    private save(): void {
        if (this._setRootVar)
            this._rootScope[LanguageRootVar] = this._translation.language;

        if (this._persist && this._storage)
            this._storage.setItem('language', this._translation.language);
    }

    public get language(): string {
        return this._translation.language;
    }

    public set language(value: string) {
        if (value != this._translation.language) {
            this._translation.language = value;
            
            this.save();                
            this._rootScope.$broadcast(LanguageChangedEvent, value);
        }
    }

    public use(language: string): string {
        if (language != null)
            this.language = language;
        return this.language;
    }

    public setTranslations(language: string, translations: any): void {
        return this._translation.setTranslations(language, translations);
    }

    public translate(key: string): string {
        return this._translation.translate(key);
    }

    public translateArray(keys: string[]): string[] {
        return this._translation.translateArray(keys);
    }
    
    public translateSet(keys: string[], keyProp: string, valueProp: string): any[] {
        return this._translation.translateSet(keys, keyProp, valueProp);
    }

    public translateObjects(items: any[], keyProp: string, valueProp: string): any[] {
        return this._translation.translateObjects(items, keyProp, valueProp);
    }

    public translateWithPrefix(prefix: string, key: string) {
        return this._translation.translateWithPrefix(prefix, key);
    }

    public translateSetWithPrefix(prefix: string, keys: string[], keyProp: string, valueProp: string) {
        return this._translation.translateSetWithPrefix(prefix, keys, keyProp, valueProp);
    }

    public translateSetWithPrefix2(prefix: string, keys: string[], keyProp: string, valueProp: string) {
        return this._translation.translateSetWithPrefix2(prefix, keys, keyProp, valueProp);
    }
}
