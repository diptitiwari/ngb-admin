<template>
  <div>
    <vx-card class="mb-base">
      <div class="vx-row">
        <div class="vx-col w-full md:w-1/2 lg:w-1/2 w-full">
          <header class="header-table vs-table--header">
            <div class="con-input-search vs-table--search">
              <input type="text" class="input-search vs-table--search-input"/>
              <i class="vs-icon notranslate icon-scale material-icons null">search</i>
            </div>
          </header>
        </div>
        <div class="vx-col md:w-1/2 w-full lg:w-1/2 w-full">
          <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
            <li>
              <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                <small class="mr-3">Tax Exemption</small>
                <vs-switch
                  color="success"
                  class="mr-3"
                  icon-pack="feather"
                  vs-icon-on="icon-check-circle"
                  vs-icon-off="icon-slash"
                  v-model="taxExemption"
                  @change="updateTaxEx"
                >
                  <span slot="on">YES</span>
                  <span slot="off">NO</span>
                </vs-switch>
              </div>
            </li>
            <!--<li>
              <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                <vs-button
                  color="primary"
                  icon-pack="feather"
                  icon="icon-plus"
                  class="truncate"
                  @click="addIdentifierPopup=true"
                  size="small"
                >{{$t('label.anchor.addclientidentities')}}</vs-button>
              </div>
            </li>-->
          </ul>
        </div>
      </div>
      <vs-divider/>
      <div class="vx-row ">
        <vs-tabs alignment="fixed" position="left" v-model="activeTab">
          <vs-tab :label="$t('label.anchor.addclientidentities')">
            <div class="tab-text mx-2">
              <div class="vx-row">
                <div class="vx-col md:w-full lg:w-full">
                  <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
                    <li>
                      <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                        <vs-button
                          color="primary"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="truncate"
                          @click="addIdentifierPopup=true"
                          size="small"
                        >{{$t('label.anchor.addclientidentities')}}
                        </vs-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <vs-table
                :max-items="descriptionItems[0]"
                pagination
                :data="identifiers"
                description
                :description-items="descriptionItems"
                description-title="Registries"
                description-connector="of"
                description-body="Pages"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.heading.uniqueidentification')}}</vs-th>
                  <vs-th>{{$t('label.heading.description')}}</vs-th>
                  <vs-th>{{$t('label.heading.type')}}</vs-th>
                  <vs-th>{{$t('label.heading.identitydocuments')}}</vs-th>
                  <vs-th>{{$t('label.heading.actions')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(identifier, index) in data">
                    <vs-td :data="identifier.documentKey">{{identifier.documentKey}}</vs-td>

                    <vs-td :data="identifier.description">{{identifier.description}}</vs-td>
                    <vs-td :data="identifier.documentType.name">{{identifier.documentType.name}}</vs-td>
                    <vs-td :data="identifier.document">{{getDocument(identifier.document)}}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Upload Document"
                        icon="UploadCloudIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click="uploadIdentifierDocPopUp=true; selectIdentifier=identifier.id"
                      />
                      <feather-icon
                        @click="deleteIdentifier(identifier.id)"
                        class="ml-1"
                        title="Delete Identities"
                        icon="XIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      />
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.add.additionalinfo')">
            <div class="tab-text mx-2">
              <div class="vx-row" v-if="$_.isEmpty(addInfo)">
                <div class="vx-col md:w-full lg:w-full">
                  <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
                    <li>
                      <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                        <vs-button
                          color="primary"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="truncate"
                          @click="additionalInfoPopup=true"
                          size="small"
                        >{{$t('label.add.additionalinfo')}}
                        </vs-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="px-4 py-4 list-item-component" v-if="!$_.isEmpty(addInfo)">
                <div class="vx-row">
                  <div class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col">
                    <div class="flex items-center">
                      <small class="mr-2 small-text-chip">{{addInfo.financeId}}</small>
                      <h6 class="todo-title">{{getAdditionalInfoData(addInfo.nationalityId,
                        addInfo.nationalityDatas)}}</h6>
                    </div>
                    <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex"></div>
                  </div>

                  <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
                    <feather-icon
                      icon="Edit2Icon"
                      class="cursor-pointer"
                      svgClasses="w-5 h-5"
                      @click=""
                    />
                  </div>
                </div>
                <div class="vx-row mt-2">
                  <div class="vx-col w-full">
                    <vs-chip class="mr-1">
                      <span>{{getDate(addInfo.dateOfBirth)}}</span>
                    </vs-chip>
                    <vs-chip color="primary">{{getAdditionalInfoData(addInfo.preferLanId, addInfo.languagesDatas)}}
                    </vs-chip>
                  </div>
                </div>
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <p class="mt-2 truncate">{{addInfo.remarks}}</p>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab :label="$t('button.documentuploads')">
            <div class="tab-text mx-2">
              <!-- <div class="vx-row">
                <div class="vx-col md:w-full lg:w-full">
                  <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
                    <li>
                      <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                        <vs-button
                          color="primary"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="truncate"
                          @click="uploadDocumentPopup=true"
                          size="small"
                        >{{$t('button.documentuploads')}}</vs-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> -->
              <vs-table
                :max-items="5"
                pagination
                :data="clientDocuments"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.heading.name')}}</vs-th>
                  <vs-th>{{$t('label.heading.description')}}</vs-th>
                  <vs-th>{{$t('table.heading.filename')}}</vs-th>
                  <vs-th>{{$t('label.heading.actions')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(document, index) in data">
                    <vs-td :data="document.name">{{document.name}}</vs-td>

                    <vs-td :data="document.description">{{document.description}}</vs-td>
                    <vs-td :data="document.fileName">{{document.fileName}}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Download Document"
                        icon="DownloadCloudIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click="downloadClientDoc(document.id)"
                      />
                      <feather-icon
                        @click="removeClientDocument(document.id)"
                        class="ml-1"
                        title="Delete Identities"
                        icon="XIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      />
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vs-tab>
          <vs-tab :label="$t('tab.creditCarddetails')">
            <div class="tab-text mx-2">
              <!-- <div class="vx-row">
                <div class="vx-col md:w-full lg:w-full">
                  <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
                    <li>
                      <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                        <vs-button
                          color="primary"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="truncate"
                          size="small"
                          @click="creditCardDetailsPopUp=true"
                        >{{$t('tab.creditCarddetails')}}</vs-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> -->
              <vs-table
                :max-items="5"
                pagination
                :data="cardDetails"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.heading.name')}}</vs-th>
                  <vs-th>{{$t('table.heading.cardNumber')}}</vs-th>
                  <vs-th>{{$t('table.heading.cardType')}}</vs-th>
                  <vs-th>{{$t('table.heading.cardExpiryDate')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(card, index) in data">
                    <vs-td :data="card.name">{{card.name}}</vs-td>

                    <vs-td :data="card.cardNumber">{{card.cardNumber}}</vs-td>
                    <vs-td :data="card.cardType">{{card.cardType}}</vs-td>

                    <vs-td :data="card.cardExpiryDate">{{card.cardExpiryDate}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.client.achcard')">
            <div class="tab-text">
              <div class="vx-row">
                <div class="vx-col md:w-full lg:w-full">
                  <ul class="horizontal-sm-btn flex items-center mb-2 float-right">
                    <li>
                      <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                        <vs-button
                          color="primary"
                          icon-pack="feather"
                          icon="icon-plus"
                          class="truncate"
                          @click="achcardPopUp=true"
                        >{{$t('label.client.achcard')}}
                        </vs-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <vs-table
                :max-items="5"
                class="mt-3"
                pagination
                :data="achCards"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.heading.name')}}</vs-th>
                  <vs-th>{{$t('table.heading.routingNumber')}}</vs-th>
                  <vs-th>{{$t('table.heading.bankAccountNumber')}}</vs-th>
                  <vs-th>{{$t('table.heading.bankName')}}</vs-th>
                  <vs-th>{{$t('label.heading.accounttype')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(achCard, indextr) in data">
                    <vs-td :data="achCard.name">{{achCard.name}}</vs-td>

                    <vs-td :data="achCard.routingNumber">{{achCard.routingNumber}}</vs-td>
                    <vs-td
                      :data="achCard.bankAccountNumber"
                    >{{achCard.bankAccountNumber}}
                    </vs-td>

                    <vs-td :data="achCard.bankName">{{achCard.bankName}}</vs-td>
                    <vs-td :data="achCard.accountType">{{achCard.accountType}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.billprofile')">
            <div class="tab-text mx-2">
              <div class="vx-row">
                <div class="vx-col w-full mt-3">
                  <vx-card title no-shadow card-border>
                    <div class="vx-row">
                      <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                          <span
                            class="font-medium text-lg leading-none"
                          >{{$t('label.ClientBillProfile')}}</span>
                        </div>
                        <vs-divider/>
                      </div>
                    </div>
                    <div class="block overflow-x-auto">
                      <vs-table stripe :data="clientBillProfile">
                        <template slot-scope="{data}">
                          <vs-tr :key="index" v-for="(billProfile, index) in data">
                            <vs-td>{{$_.capitalize(index)}}</vs-td>
                            <vs-td v-if="$_.endsWith(index, 'Day')">{{getDate(billProfile)}}</vs-td>
                            <vs-td v-else>{{billProfile}}</vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </vx-card>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.heading.addclientidentifier')"
        :active.sync="addIdentifierPopup"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.input.documenttype')}}</small>
              <v-select
                label="name"
                :options="idTemplate.allowedDocumentTypes"
                v-model="identifier.documentTypeId"
                :reduce="name => name.id"
                placeholder="Select Document Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.input.uniqueidentification')"
                class="w-full font-semibold"
                icon-no-border
                v-model="identifier.documentKey"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.heading.description')}}</small>
              <vs-textarea v-model="identifier.description" class="font-semibold"></vs-textarea>
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border" @click="addIdentifierPopup=false">{{$t('label.button.close')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button @click="addIdentifier">{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('tab.documentsuploads')"
        :active.sync="uploadIdentifierDocPopUp"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.heading.name')"
                class="w-full font-semibold"
                icon-no-border
                v-model="identifierDocument.name"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <input
                :label="$t('label.input.selectfile')"
                id="identifierDoc"
                type="file"
                ref="identifierDoc"
                class="w-full font-semibold"
                icon-no-border
                @change="() => this.identifierDocument.file = this.$refs.identifierDoc.files[0]"
              />
            </div>
          </div>
          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border" @click="resetForm">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button @click="uploadIdentifierDoc">{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.add.additionalinfo')"
        :active.sync="additionalInfoPopup"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <small class="date-label">{{$t('label.gender')}}</small>
              <v-select
                label="text"
                :options="addInfo.genderDatas"
                :reduce="mCodeValue => mCodeValue.id"
                placeholder="Select Gender"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <small class="date-label">{{$t('label.idType')}}</small>
              <v-select
                label="text"
                :options="addInfo.customeridentificationDatas"
                placeholder="Select Id Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <!-- <vs-select
                :label="$t('label.nationality')"
                class="selectExample w-full vs-search-categeory"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item,index) in categeory"
                />
              </vs-select>-->
              <small class="date-label font-semibold">{{$t('label.nationality')}}</small>
              <v-select
                label="text"
                :options="categeory"
                placeholder="Select Nationality"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.idNumber')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.jobTitle')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <!-- <vs-select
                :label="$t('label.ageGroup')"
                class="selectExample w-full vs-search-categeory"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item,index) in categeory"
                />
              </vs-select>-->
              <small class="date-label font-semibold">{{$t('label.ageGroup')}}</small>
              <v-select
                label="text"
                :options="categeory"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.dateOfBirth')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.utsCustomerId')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <!-- <vs-select
                :label="$t('label.preferredLang')"
                class="selectExample w-full vs-search-categeory"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item,index) in categeory"
                />
              </vs-select>-->
              <small class="date-label font-semibold">{{$t('label.preferredLang')}}</small>
              <v-select
                label="text"
                :options="categeory"
                placeholder="Select Language"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.financeId')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <vs-input :label="$t('label.input.remarks')" class="w-full font-semibold" icon-no-border/>
            </div>
            <div class="vx-col mb-2 sm:w-1/2 w-full">
              <!-- <vs-select
                :label="$t('label.preferredCommunication')"
                class="selectExample w-full vs-search-categeory"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item,index) in preferredCommunication"
                />
              </vs-select>-->
              <small class="date-label font-semibold">{{$t('label.preferredCommunication')}}</small>
              <v-select
                label="text"
                :options="preferredCommunication"
                placeholder="Select Communication"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full vs-search-categeory font-semibold"
              />
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button>{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('tab.documentsuploads')"
        :active.sync="uploadDocumentPopup"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.heading.name')"
                class="w-full font-semibold"
                icon-no-border
                v-model="clientDocument.name"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label">{{$t('label.input.description')}}</small>
              <vs-textarea
                class="w-full"
                v-model="clientDocument.description"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <input
                :label="$t('label.input.selectfile')"
                id="file"
                type="file"
                ref="clientDocFile"
                class="w-full font-semibold"
                icon-no-border
                @change="() => this.clientDocument.file = this.$refs.clientDocFile.files[0]"
              />
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border" @click="resetForm">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button @click="addClientDocument()">{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('tab.creditCarddetails')"
        :active.sync="creditCardDetails"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <vs-radio v-model="creditCard.type" vs-value="luis" class="mr-2">CreditCard</vs-radio>
              <vs-radio v-model="creditCard.type" vs-value="luis">Paypal</vs-radio>
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input :label="$t('label.heading.name')" class="w-full font-semibold" icon-no-border
                        v-model="creditCard.name"/>
            </div>
            <div class="vx-col mb-2 w-full font-semibold">
              <vs-input :label="$t('label.cardnumber')" class="2/3" icon-no-border v-model="creditCard.cardNumber"/>
              <vs-input v-if="creditCard.cardNumber" :label="$t('label.cvv')" class="2/2" icon-no-border
                        v-model="creditCard.cvvNumber"/>
            </div>
            <div class="vx-col mb-2 w-full font-semibold">
              <small class="date-label">{{$t('label.cardType')}}</small>
              <v-select
                label="text"
                :options="cardTypes"
                v-model="creditCard.cardType"
                placeholder="Select Card Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full"
              />
            </div>
            <div class="vx-col mb-2 w-full font-semibold">
              <vs-input :label="$t('label.expirydate')" class="w-full" icon-no-border
                        v-model="creditCard.cardExpiryDate"/>
              <small>(MM/yyyy)</small>
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border" @click="resetForm">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button @click="addCreditCard('Card')">{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.client.achcard')"
        :active.sync="achcardPopUp"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.client.achcard.routingNumber')"
                class="w-full font-semibold"
                icon-no-border
                v-model="achCard.routingNumber"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.client.achcard.bankAccountNumber')"
                class="w-full font-semibold"
                icon-no-border
                v-model="achCard.bankAccountNumber"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input
                :label="$t('label.client.achcard.bankName')"
                class="w-full font-semibold"
                icon-no-border
                v-model="achCard.bankName"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input :label="$t('label.client.achcard.name')" class="w-full font-semibold" icon-no-border
                        v-model="achCard.name"/>
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="font-semibold">{{$t('label.client.achcard.accountType')}}</small>
              <div>
                <vs-radio v-model="achCard.accountType" vs-value="luis" class="mr-2">Checking</vs-radio>
                <vs-radio v-model="achCard.accountType" vs-value="luis">Savings</vs-radio>
              </div>
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border" @click="resetForm">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button @click="addCreditCard('ACH')">{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { quillEditor } from 'vue-quill-editor'
  import moment from 'moment'
  import _ from 'lodash'
  import vSelect from 'vue-select'
  import {
    getIdentifierTemplate,
    getClientIdentifiers,
    addClientIdentifiers,
    getIdentifierDocument,
    getClientBillProfile,
    deleteClientIdentifiers,
    getAllClientDocuments,
    deleteClientDocument,
    uploadClientDocument,
    updateTaxExemption,
    uploadIdentifierDocument,
    getClientCardDetails,
    addClientCardDetail,
    getAdditionalInfo,
    addAdditionalInfo
  } from '@/http/customer'
  import { setHeader, removeHeader, api } from '@/http'
  import { createFormData } from '@/plugins'

  Object.defineProperty(Vue.prototype, '$_', { value: _ })

  const creditCardObj = {
    type: 'CreditCard',
    cardType: null,
    name: null,
    cvvNumber: null,
    cardNumber: null,
    cardExpiryDate: null
  }
  const achCardObj = {
    type: 'ACH',
    routingNumber: null,
    bankAccountNumber: null,
    bankName: null,
    name: null,
    accountType: 'Checking'
  }
  const additionalInfoObj = {
    nationality: null,
    jobTitle: null,
    preferredLang: null,
    remarks: null,
    idType: null,
    idNumber: null,
    ageGroup: null,
    utsCustomerId: null,
    financeId: null,
    preferredCommunication: null,
    dateFormat: 'dd MMMM yyyy',
    activationDate: null,
    locale: 'en',
    dateOfBirth: null
  }

  export default {
    props: ['clientId'],
    data () {
      return {
        taxExemption: true,
        descriptionItems: [5, 10, 15],
        serviceOrder: [],
        addIdentifierPopup: false,
        uploadIdentifierDocPopUp: false,
        identifier: {
          documentTypeId: null,
          documentKey: null,
          description: null
        },
        identifierDocument: {
          name: null,
          file: null
        },
        selectIdentifier: '',
        additionalInfoPopup: false,
        uploadDocumentPopup: false,
        clientDocument: {
          name: null,
          description: null,
          file: null
        },
        creditCardDetailsPopUp: false,
        achcardPopUp: false,
        billProfile: false,
        activeTab: 0,
        creditCard: creditCardObj,
        cardTypes: [
          'MASTERCARD', 'VISA', 'DISCOVERY', 'AMERICAN EXPRESS', 'OTHERS'
        ],
        achCard: achCardObj,
        addInfoData: additionalInfoObj
      }
    },
    computed: {
      identifiers () {
        return this.$store.getters['customer/getClientIdentifiers']
      },
      idTemplate () {
        return this.$store.getters['customer/getIdentifierTemplate']
      },
      clientDocuments () {
        return this.$store.getters['customer/getClientDocuments']
      },
      clientDetail () {
        return this.$store.getters['customer/getClientDetail']
      },
      clientBillProfile () {
        return this.$store.getters['customer/getClientBillProfile']
      },
      cardDetails () {
        return _.filter(this.$store.getters['customer/getCreditCardDetails'], (card) =>
          card.type === 'CreditCard' || card.type === 'Paypal'
        )
      },
      achCards () {
        return _.filter(this.$store.getters['customer/getCreditCardDetails'], { type: 'ACH' })
      },
      addInfo () {
        return this.$store.getters['customer/getAdditionalInfo']
      }
    },
    components: {
      quillEditor,
      'v-select': vSelect
    },
    watch: {
      activeTab (newValue) {
        if (newValue === 0) {
          this.getIdentifiers()
        } else if (newValue === 1) {
          this.additionalInfo()
        } else if (newValue === 2) {
          this.getDocumentsByClient()
        } else if (newValue === 3 || newValue === 4) {
          this.getCreditCardDetail()
        } else if (newValue === 5) {
          this.getBillProfileData()
        }
      },
      addIdentifierPopup (newValue) {
        if (newValue) this.identifierTemplate()
      },
      additionalInfoPopup (newValue) {
        if (newValue) this.additionalInfoTemplate()
      }
    },
    methods: {
      getDate (date) {
        if (date) {
          return moment(date.join('/')).format('DD MMMM YYYY')
        }
      },
      getDocument (document) {
        return _.map(document, 'fileName').join(',')
      },
      getAdditionalInfoData (id, dataObj) {
        const data = _.find(dataObj, { id: id })
        return data ? data.mCodeValue : null
      },
      editAdditionalInfo () {
      },
      async identifierTemplate () {
        try {
          const response = await getIdentifierTemplate(this.clientId)
          this.$store.dispatch('customer/setIdentifierTemplate', response.data)
        } catch (e) {
          console.log(
            'Something went wrong while retrieving identifier template',
            e
          )
        }
      },
      async getIdentifiers () {
        try {
          const response = await getClientIdentifiers(this.clientId)
          this.$store.dispatch('customer/setClientIdentifier', response.data)
          _.forEach(response.data, async (value) => {
            const documentResp = await getIdentifierDocument(value.id)
            this.$store.dispatch(
              'customer/setIdentifierDocument',
              {
                data: documentResp.data,
                identifierId: value.id
              }
            )
          })
        } catch (e) {
          console.log(
            'Something went wrong while retrieving client identifiers or documents',
            e
          )
        }
      },
      async addIdentifier () {
        try {
          await addClientIdentifiers(this.clientId, this.identifier)
          this.addIdentifierPopup = false
          this.getIdentifiers()
          this.resetForm()
        } catch (e) {
          console.log('Something went wrong while adding identifier template', e)
        }
      },
      async uploadIdentifierDoc () {
        try {
          setHeader('Content-Type', 'multipart/form-data')
          await uploadIdentifierDocument(this.selectIdentifier, createFormData(this.identifierDocument))
          removeHeader('Content-Type')
          this.getIdentifiers()
          this.resetForm()
          this.uploadIdentifierDocPopUp = false
        } catch (e) {
          console.log('Something went wrong while adding identifier template', e)
        }
      },
      async deleteIdentifier (id) {
        try {
          await deleteClientIdentifiers(this.clientId, id)
          this.getIdentifiers()
        } catch (e) {
          console.log(
            'Something went wrong while deleting identifier template',
            e
          )
        }
      },
      async getDocumentsByClient () {
        try {
          const response = await getAllClientDocuments(this.clientId)
          this.$store.dispatch('customer/setClientDocuments', response.data)
        } catch (e) {
          console.log(
            'Something went wrong while retrieving client documents',
            e
          )
        }
      },
      async removeClientDocument (id) {
        try {
          await deleteClientDocument(this.clientId, id)
          this.getDocumentsByClient()
        } catch (e) {
          console.log(
            'Something went wrong while retrieving client documents',
            e
          )
        }
      },
      async addClientDocument () {
        debugger
        try {
          setHeader('Content-Type', 'multipart/form-data')
          await uploadClientDocument(this.clientId, createFormData(this.clientDocument))
          removeHeader('Content-Type')
          this.uploadDocumentPopup = false
          this.resetForm()
          this.getDocumentsByClient()
        } catch (e) {
          console.log('Something went wrong while uploading client document', e)
        }
      },
      downloadClientDoc (docId) {
        axios({
          url: `${api.NGB}/clients/${this.clientId}/documents/attachment/${docId}?tenantIdentifier=default`,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]))
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', 'file.pdf')
          document.body.appendChild(fileLink)

          fileLink.click()
        })
      },
      async updateTaxEx () {
        try {
          await updateTaxExemption(this.clientId, {
            taxExemption: this.taxExemption
          })
          this.$store.dispatch(
            'customer/updateTaxExemption',
            this.taxExemption ? 'Y' : 'N'
          )
        } catch (e) {
          console.log('Something went wrong while updating tax exemption', e)
        }
      },
      async getBillProfileData () {
        try {
          const response = await getClientBillProfile(this.clientId)
          this.$store.dispatch('customer/setBillProfileData', response.data)
        } catch (e) {
          console.log(
            'Something went wrong while retrieving bill profile data',
            e
          )
        }
      },
      async getCreditCardDetail () {
        try {
          const response = await getClientCardDetails(this.clientId)
          this.$store.dispatch('customer/setCreditCardDetails', response.data)
        } catch (e) {
          console.log(
            'Something went wrong while retrieving credit card details : ',
            e
          )
        }
      },
      async addCreditCard (type) {
        const data = type === 'Card' ? this.creditCard : this.achCard
        try {
          await addClientCardDetail(this.clientId, data)
          this.getCreditCardDetail()
          this.resetForm()
          this.creditCardDetailsPopUp = false
          this.achcardPopUp = false
        } catch (e) {
          console.log(
            'Something went wrong while adding credit card details : ',
            e
          )
        }
      },
      async additionalInfo () {
        try {
          const response = await getAdditionalInfo(this.clientId)
          this.$store.dispatch('customer/setAdditionalInfo', response.data)
        } catch (e) {
          console.log(
            'Something went wrong while retrieving additional Info', e
          )
        }
      },
      async addAdditionalInfo () {
        try {
          const response = await addAdditionalInfo(this.clientId, this.addInfoData)
          this.additionalInfo()
        } catch (e) {
          console.log(
            'Something went wrong while retrieving additional Info', e
          )
        }
      },
      resetForm () {
        if (this.activeTab === 0) {
          this.identifier = {
            documentTypeId: null,
            documentKey: null,
            description: null
          }
        } else if (this.activeTab === 2) {
          this.clientDocument = {
            name: null,
            description: null,
            file: null
          }
        } else if (this.uploadIdentifierDocPopUp) {
          this.identifierDocument = {
            name: null,
            file: null
          }
        } else if (this.creditCardDetailsPopUp) {
          this.creditCard = creditCardObj
        } else if (this.achcardPopUp) {
          this.achCard = achCardObj
        }
      }
    },
    created () {
      this.activeTab = 0
      this.taxExemption = this.clientDetail.taxExemption === 'N' ? false : true
      this.getIdentifiers()
    }
  }
</script>
<style lang="scss">
  .small-text-chip {
    background: linear-gradient(
        30deg,
        rgba(var(--vs-primary), 1),
        rgba(var(--vs-primary), 0.5)
    ) !important;
    -webkit-box-shadow: 0 0 8px 0 rgba(var(--vs-primary), 0.4) !important;
    box-shadow: 0 0 8px 0 rgba(var(--vs-primary), 0.4) !important;
    color: #fff;
    border-radius: 5px;
    padding: 3px 5px;
  }

  .list-item-component {
    webkit-transition: background-color 0.2s, -webkit-transform 0.2s;
    -webkit-box-shadow: 0 0 8px 0 rgba(var(--vs-primary), 0.4) !important;
    box-shadow: 0 0 4px 0 rgba(var(--vs-primary), 0.4) !important;
  }
</style>
