import {BasePage} from "./base-Page";
import { WrapperClass } from '../wrapper/wrapperClass';
import { TestData } from '../helpers/testData';

import {Page, Locator} from "@playwright/test";

export class FormSubmission extends BasePage {    
    private wrapper: WrapperClass;
    private contact: Locator;
    private fnameInput: Locator;
    private lnameInput: Locator;
    private eInput: Locator;
    private sInput: Locator;
    private mInput: Locator;
    private submitBtn: Locator;

    private fnameError: Locator;
    private lnameError: Locator;
    private emailError: Locator;
    private subjectError: Locator;
    private messageError: Locator;  
    private messageSuccess: Locator;

    constructor(page: Page) {
        super(page);
        this.wrapper = new WrapperClass(page);

        this.contact = page.locator('[data-test="nav-contact"]');
        this.fnameInput = page.locator('[data-test="first-name"]');
        this.lnameInput = page.locator('[data-test="last-name"]');
        this.eInput = page.locator('[data-test="email"]');
        this.mInput = page.locator('[data-test="message"]');
        this.submitBtn = page.locator('[data-test="contact-submit"]');

        this.fnameError = page.locator('[data-test="first-name-error"]');
        this.lnameError = page.locator('[data-test="last-name-error"]');
        this.emailError = page.locator('[data-test="email-error"]');
        this.subjectError = page.locator('[data-test="subject-error"]');
        this.messageError = page.locator('[data-test="message-error"]'); 
        this.messageSuccess = page.locator('.alert-success');
    }

    async navigateTo(url: string) {
        await super.navigateTo(url);
    }   
    async invalidFormSubmission(){
        await this.wrapper.click(this.contact);
        await this.wrapper.click(this.submitBtn);
    }
    async subjectSelector(){
        await this.page.selectOption('#subject', { value: 'webmaster' });
    }
    async verifyInvalidFormErrorMessages(){
        await this.wrapper.verifyText(this.fnameError, "First name is required");
        await this.wrapper.verifyText(this.lnameError, "Last name is required");
        await this.wrapper.verifyText(this.emailError, "Email is required");
        await this.wrapper.verifyText(this.subjectError, "Subject is required");
        await this.wrapper.verifyText(this.messageError, "Message is required");
    }

    async validFormSubmission(){
        await this.wrapper.click(this.contact);
        await this.wrapper.typeText(this.fnameInput, TestData.firstName);
        await this.wrapper.typeText(this.lnameInput, TestData.lastName);
        await this.wrapper.typeText(this.eInput, TestData.email);
        await this.subjectSelector();
        await this.wrapper.typeText(this.mInput, TestData.message);
        await this.wrapper.click(this.submitBtn);
    }

    async verifyValidFormSuccessMessage(){
        await this.wrapper.verifyText(this.messageSuccess, "Thanks for your message! We will contact you shortly.");
    }


}