import { FieldType, Field } from 'document-template/src/model/field';
import { h, Component } from 'preact';
import InputBox from '../components/InputBox';
import TextArea from '../components/Textarea';
import TagsInput from '../components/TagsInput';

export default class ComponentManager {
     public static getMapedComponent =  (field: Field, state: any): JSX.Element => {

        switch(field.type){
            case FieldType.String:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.Number:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.Boolean:
                return (
                    <TextArea name = {field.name} value={state[field.name]} label="TextArea Box Label"/>
                );
            case FieldType.Date:
                return (
                    <TagsInput name = {field.name} value={state[field.name]} label="TagsInput Box Label"/>
                );
            case FieldType.Time:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.ZonedDateTime:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.File:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.List:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
            case FieldType.Object:
                return (
                    <InputBox name = {field.name} value={state[field.name]} label="Input Box Label"/>
                );
        }
    
        
      }

}