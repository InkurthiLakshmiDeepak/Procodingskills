/**
 * @File Name          : BasicAccountInformationServer.cls
 * @Description        : 
 * @Author             : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Group              : 
 * @Last Modified By   : ChangeMeIn@UserSettingsUnder.SFDoc
 * @Last Modified On   : 5/3/2020, 5:43:39 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    5/3/2020   ChangeMeIn@UserSettingsUnder.SFDoc     Initial Version
**/
public with sharing class BasicAccountInformationServer {
   @AuraEnabled
   public static List<Account> getAccounts(string accountName , string accountPhone){
       accountName ='%'+accountName+'%';
       accountPhone ='%'+accountPhone+'%';
       return [select Id , Name ,Phone, parentid , type , Active__c FROM Account where name like : accountName or phone Like : accountPhone ];
       
   }
}
