'use strict';

import { ITranslateProvider } from './ITranslateService';
import { Translation } from './Translation';
import { TranslateService } from './TranslateService';

export class TranslateProvider extends Translation implements ITranslateProvider {
    private _setRootVar: boolean = true;
    private _persist: boolean = true;
    private _service: TranslateService;
    
    public constructor() {
        super();
    }

    public get setRootVar(): boolean {
        return this._setRootVar;  
    }

    public set setRootVar(value: boolean) {
        this._setRootVar = !!value;
    }

    public get persist(): boolean {
        return this._persist;  
    }

    public set persist(value: boolean) {
        this._persist = !!value;
    }

    public $get(
        $rootScope: ng.IRootScopeService, 
        $window: ng.IWindowService
    ): any {
        "ngInject";

        if (this._service == null) 
            this._service = new TranslateService(this, this._setRootVar, this._persist, $rootScope, $window);
        return this._service;
    }
}
