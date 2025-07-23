require 'rails_helper'

describe 'GET /search/:supermarket' do
  context 'with invalid supermarket' do
    it 'returns 400 Bad Request' do
      get '/search/invalid', params: { q: 'butter' }

      expect(response).to have_http_status(:bad_request)
      expect(response.parsed_body).to eq({ 'error' => 'Invalid supermarket source' })
    end
  end

  context 'with missing query' do
    it 'returns 400 Bad Request' do
      get '/search/nw'  # no `q` param

      expect(response).to have_http_status(:bad_request)
      expect(response.parsed_body).to eq({ 'error' => 'Query parameter is required' })
    end
  end
end

RSpec.describe 'Search API', type: :request do
  describe 'GET /search/:supermarket' do
    let(:query) { 'butter' }
    let(:supermarket) { 'test_shop' }
    let(:file_path) { Rails.root.join('app', 'assets', 'data', "#{supermarket}.json") }

    context 'when supermarket is valid and file exists' do
      before do
        FileUtils.mkdir_p(File.dirname(file_path))
        File.write(file_path, [{ name: 'Butter', price: 9.5 }].to_json)
      end

      after do
        File.delete(file_path) if File.exist?(file_path)
      end

      it 'returns 200 OK and the data' do
        get "/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:ok)
        json = response.parsed_body

        expect(json['query']).to eq(query)
        expect(json['supermarket']).to eq(supermarket)
        expect(json['data']).to be_an(Array)
        expect(json['data'].first).to include('name' => 'Butter', 'price' => 9.5)
      end
    end

    context 'when supermarket is valid but file is missing' do
      it 'returns 404 Not Found' do
        get "/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:not_found)
        expect(response.parsed_body).to eq({ 'error' => 'Not found' })
      end
    end
  end
end

