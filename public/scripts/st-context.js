import {
    activateSendButtons,
    addOneMessage,
    appendMediaToMessage,
    callPopup,
    characters,
    chat,
    chat_metadata,
    create_save,
    deactivateSendButtons,
    event_types,
    eventSource,
    extension_prompts,
    Generate,
    generateQuietPrompt,
    getCharacters,
    getCurrentChatId,
    getRequestHeaders,
    getThumbnailUrl,
    main_api,
    max_context,
    menu_type,
    messageFormatting,
    name1,
    name2,
    online_status,
    openCharacterChat,
    reloadCurrentChat,
    renameChat,
    saveChatConditional,
    saveMetadata,
    saveReply,
    saveSettingsDebounced,
    selectCharacterById,
    sendGenerationRequest,
    sendStreamingRequest,
    sendSystemMessage,
    setExtensionPrompt,
    stopGeneration,
    streamingProcessor,
    substituteParams,
    substituteParamsExtended,
    this_chid,
    updateChatMetadata,
    updateMessageBlock,
} from '../script.js';
import {
    extension_settings,
    ModuleWorkerWrapper,
    renderExtensionTemplate,
    renderExtensionTemplateAsync,
    writeExtensionField,
} from './extensions.js';
import { groups, openGroupChat, selected_group } from './group-chats.js';
import { t, translate } from './i18n.js';
import { hideLoader, showLoader } from './loader.js';
import { MacrosParser } from './macros.js';
import { oai_settings } from './openai.js';
import { callGenericPopup, Popup, POPUP_RESULT, POPUP_TYPE } from './popup.js';
import { power_user, registerDebugFunction } from './power-user.js';
import { humanizedDateTime, isMobile, shouldSendOnEnter } from './RossAscends-mods.js';
import { ScraperManager } from './scrapers.js';
import { executeSlashCommands, executeSlashCommandsWithOptions, registerSlashCommand } from './slash-commands.js';
import { SlashCommand } from './slash-commands/SlashCommand.js';
import { ARGUMENT_TYPE, SlashCommandArgument, SlashCommandNamedArgument } from './slash-commands/SlashCommandArgument.js';
import { SlashCommandParser } from './slash-commands/SlashCommandParser.js';
import { tag_map, tags } from './tags.js';
import { textgenerationwebui_settings } from './textgen-settings.js';
import { tokenizers, getTextTokens, getTokenCount, getTokenCountAsync, getTokenizerModel } from './tokenizers.js';
import { ToolManager } from './tool-calling.js';
import { timestampToMoment, uuidv4 } from './utils.js';
import { getGlobalVariable, getLocalVariable, setGlobalVariable, setLocalVariable } from './variables.js';
import { convertCharacterBook, loadWorldInfo, saveWorldInfo, updateWorldInfoList } from './world-info.js';

export function getContext() {
    return {
        chat,
        characters,
        groups,
        name1,
        name2,
        characterId: this_chid,
        groupId: selected_group,
        chatId: selected_group
            ? groups.find(x => x.id == selected_group)?.chat_id
            : (characters[this_chid]?.chat),
        getCurrentChatId,
        getRequestHeaders,
        reloadCurrentChat,
        renameChat,
        saveSettingsDebounced,
        onlineStatus: online_status,
        maxContext: Number(max_context),
        chatMetadata: chat_metadata,
        streamingProcessor,
        eventSource,
        eventTypes: event_types,
        addOneMessage,
        generate: Generate,
        sendStreamingRequest,
        sendGenerationRequest,
        stopGeneration,
        tokenizers,
        getTextTokens,
        /** @deprecated Use getTokenCountAsync instead */
        getTokenCount,
        getTokenCountAsync,
        extensionPrompts: extension_prompts,
        setExtensionPrompt,
        updateChatMetadata,
        saveChat: saveChatConditional,
        openCharacterChat,
        openGroupChat,
        saveMetadata,
        sendSystemMessage,
        activateSendButtons,
        deactivateSendButtons,
        saveReply,
        substituteParams,
        substituteParamsExtended,
        SlashCommandParser,
        SlashCommand,
        SlashCommandArgument,
        SlashCommandNamedArgument,
        ARGUMENT_TYPE,
        executeSlashCommandsWithOptions,
        /** @deprecated Use SlashCommandParser.addCommandObject() instead */
        registerSlashCommand,
        /** @deprecated Use executeSlashCommandWithOptions instead */
        executeSlashCommands,
        timestampToMoment,
        /** @deprecated Handlebars for extensions are no longer supported. */
        registerHelper: () => { },
        registerMacro: MacrosParser.registerMacro.bind(MacrosParser),
        unregisterMacro: MacrosParser.unregisterMacro.bind(MacrosParser),
        registerFunctionTool: ToolManager.registerFunctionTool.bind(ToolManager),
        unregisterFunctionTool: ToolManager.unregisterFunctionTool.bind(ToolManager),
        isToolCallingSupported: ToolManager.isToolCallingSupported.bind(ToolManager),
        canPerformToolCalls: ToolManager.canPerformToolCalls.bind(ToolManager),
        registerDebugFunction,
        /** @deprecated Use renderExtensionTemplateAsync instead. */
        renderExtensionTemplate,
        renderExtensionTemplateAsync,
        registerDataBankScraper: ScraperManager.registerDataBankScraper.bind(ScraperManager),
        /** @deprecated Use callGenericPopup or Popup instead. */
        callPopup,
        callGenericPopup,
        showLoader,
        hideLoader,
        mainApi: main_api,
        extensionSettings: extension_settings,
        ModuleWorkerWrapper,
        getTokenizerModel,
        generateQuietPrompt,
        writeExtensionField,
        getThumbnailUrl,
        selectCharacterById,
        messageFormatting,
        shouldSendOnEnter,
        isMobile,
        t,
        translate,
        tags,
        tagMap: tag_map,
        menuType: menu_type,
        createCharacterData: create_save,
        /** @deprecated Legacy snake-case naming, compatibility with old extensions */
        event_types: event_types,
        Popup,
        POPUP_TYPE,
        POPUP_RESULT,
        chatCompletionSettings: oai_settings,
        textCompletionSettings: textgenerationwebui_settings,
        powerUserSettings: power_user,
        getCharacters,
        uuidv4,
        humanizedDateTime,
        updateMessageBlock,
        appendMediaToMessage,
        variables: {
            local: {
                get: getLocalVariable,
                set: setLocalVariable,
            },
            global: {
                get: getGlobalVariable,
                set: setGlobalVariable,
            },
        },
        loadWorldInfo,
        saveWorldInfo,
        updateWorldInfoList,
        convertCharacterBook,
    };
}

export default getContext;
