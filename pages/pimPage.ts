import { Page, Locator, expect } from "@playwright/test";

export class PIMPage {
  readonly page: Page;
  readonly uploadEmpPhoto: Locator;
  readonly addEmployeeLink: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emplIDField: Locator;
  readonly saveBtn: Locator;
  readonly empFullName: Locator;
  readonly dob: Locator;

  constructor(page: Page) {
     this.page = page;
     this.uploadEmpPhoto = page.locator('button[class*="employee-image-action"]');
     this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
     this.firstNameField =page.locator('input[name="firstName"]');
     this.lastNameField = page.locator('input[name="lastName"]');
     this.emplIDField =  page.locator('div.oxd-input-group:has(label:has-text("Employee Id")) input');
     this.saveBtn = page.getByRole('button', { name: 'Save' });
     this.empFullName = page.locator('h6[class*="oxd-text--h6 --strong"]');
     this.dob = page.locator('input[placeholder="yyyy-dd-mm"]').nth(1);
     }

  async uploadEmployeePhoto() {
    await this.page.waitForTimeout(5000);
    await this.page.setInputFiles('input[type="file"]', 'test-data/emp.jfif');
  }

  async addEmployee() {
    await this.addEmployeeLink.click();
    await this.uploadEmployeePhoto();
    await this.firstNameField.fill("Playwright19"); // ----> DERIVE FROM TEST DATA and UTILS FILE RANDOM STRING HOME WORK
    await this.lastNameField.fill("Cucumber19"); // ----> DERIVE FROM TEST DATA and UTILS FILE RANDOM STRING
    await this.emplIDField.fill("EMP0044"); // ----> DERIVE FROM TEST DATA and UTILS FILE RANDOM STRING
    await this.saveBtn.click();
  }

  async verifyNewlyAddedEmployeeDetails() {
    await this.page.waitForTimeout(15000);  //----> HOME WORK
    const fullName = await this.empFullName.innerText();
    console.log("Employee Full Name:", fullName);
    expect(fullName).toBe("Playwright19 Cucumber19"); // -> TAKE FROM TEST DATA FILE
  }

  async enterPersonalDetails() {
    await this.dob.click();
    await this.dob.fill("1995-01-01");
    await this.page.waitForTimeout(2000);
  }

  async saveButton() {
    await this.saveBtn.nth(0).click();
  }

  async performRefresh() {
    await this.page.reload();
    await this.page.waitForTimeout(10000);
    //READ FROM DOB FIELD AND COMPARE WHAT WE HAVE ENTERED WITH WHAT IS READ FROM DATE OF BIRTH AND IT SHOULD BE SAME
    //HOME WORK
  }
}